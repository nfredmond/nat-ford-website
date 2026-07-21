#!/usr/bin/env node
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const rootDir = path.resolve(new URL('..', import.meta.url).pathname)

function loadTsModule(relativePath) {
  const filePath = path.join(rootDir, relativePath)
  const source = fs.readFileSync(filePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  })
  const compiledModule = { exports: {} }

  vm.runInNewContext(
    compiled.outputText,
    {
      exports: compiledModule.exports,
      module: compiledModule,
      process: { env: {} },
    },
    { filename: filePath }
  )

  return compiledModule.exports
}

const { aggregateUsageRows, buildScopeKey, enforceFallbackRateLimit } = loadTsModule('src/lib/ai-usage.ts')

const nowMs = 1_800_000_000_000
const minutesAgo = (m) => new Date(nowMs - m * 60_000).toISOString()

// --- aggregateUsageRows ---
const rows = [
  { created_at: minutesAgo(1), input_tokens: 100, output_tokens: 50, status: 'completed' },
  { created_at: minutesAgo(30), input_tokens: 200, output_tokens: 100, status: 'completed' },
  // rate_limited events count toward request rate but not token spend
  { created_at: minutesAgo(45), input_tokens: 999, output_tokens: 999, status: 'rate_limited' },
  // invalid_payload events count toward neither
  { created_at: minutesAgo(50), input_tokens: 999, output_tokens: 999, status: 'invalid_payload' },
  // outside the hour window: token spend still counts within 24h
  { created_at: minutesAgo(120), input_tokens: 300, output_tokens: 150, status: 'completed' },
]

const snapshot = aggregateUsageRows(rows, nowMs)
assert.equal(snapshot.requestsLastHour, 3, 'completed + rate_limited within the hour count; invalid_payload does not')
assert.equal(snapshot.tokensUsed24h, 900, 'token sum excludes rate_limited and invalid_payload rows')
assert.equal(snapshot.lastRequestAtMs, Date.parse(rows[0].created_at))

const empty = aggregateUsageRows([], nowMs)
assert.equal(empty.requestsLastHour, 0)
assert.equal(empty.tokensUsed24h, 0)
assert.equal(empty.lastRequestAtMs, null)

// --- buildScopeKey ---
assert.equal(buildScopeKey('u1', 'v1', '1.2.3.4'), 'user:u1')
assert.equal(buildScopeKey(null, 'v1', '1.2.3.4'), 'guest:v1')
assert.equal(buildScopeKey(null, null, '1.2.3.4'), 'guest-ip:1.2.3.4')

// --- enforceFallbackRateLimit ---
const state = { firstSeenAt: nowMs, lastRequestAt: 0, requests: [] }

// First request passes and is recorded.
assert.equal(enforceFallbackRateLimit(state, nowMs, 3, 1000), null)
assert.equal(state.requests.length, 1)

// Immediately after: blocked by min interval.
assert.match(enforceFallbackRateLimit(state, nowMs + 100, 3, 1000) ?? '', /too quickly/)

// Spaced requests pass until the hourly cap.
assert.equal(enforceFallbackRateLimit(state, nowMs + 2000, 3, 1000), null)
assert.equal(enforceFallbackRateLimit(state, nowMs + 4000, 3, 1000), null)
assert.match(enforceFallbackRateLimit(state, nowMs + 6000, 3, 1000) ?? '', /hourly/)

// Requests age out of the rolling window.
assert.equal(enforceFallbackRateLimit(state, nowMs + 61 * 60_000, 3, 1000), null)

console.log('ai usage limits (aggregate, scope key, fallback limiter): ok')
