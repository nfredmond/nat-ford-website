#!/usr/bin/env node
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const require = createRequire(import.meta.url)
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
      require,
      process: { env: {} },
      Buffer,
    },
    { filename: filePath }
  )

  return compiledModule.exports
}

// --- lead-inbox auth tokens ---
const { computeLeadInboxToken, isLeadInboxAuthorized, secureEquals, LEAD_INBOX_SESSION_MS } = loadTsModule(
  'src/lib/security/lead-inbox-auth.ts'
)

const secret = 'inbox-password'
const nowMs = 1_800_000_000_000
const expiresAtMs = nowMs + LEAD_INBOX_SESSION_MS
const token = computeLeadInboxToken(secret, expiresAtMs)

assert.equal(isLeadInboxAuthorized(token, secret, nowMs), true, 'fresh token authorizes')
assert.equal(isLeadInboxAuthorized(token, secret, expiresAtMs + 1), false, 'expired token is rejected')
assert.equal(isLeadInboxAuthorized(token, 'wrong-password', nowMs), false, 'wrong secret is rejected')
assert.equal(isLeadInboxAuthorized(`${expiresAtMs}.deadbeef`, secret, nowMs), false, 'tampered hmac is rejected')

// Tampering with the expiry breaks the signature even if the hmac is reused.
const [, hmac] = token.split('.')
assert.equal(isLeadInboxAuthorized(`${expiresAtMs + 9999}.${hmac}`, secret, nowMs), false, 'expiry tampering is rejected')

assert.equal(isLeadInboxAuthorized(undefined, secret, nowMs), false)
assert.equal(isLeadInboxAuthorized('', secret, nowMs), false)
assert.equal(isLeadInboxAuthorized('no-separator', secret, nowMs), false)
assert.equal(isLeadInboxAuthorized('.only-hmac', secret, nowMs), false)

assert.equal(secureEquals('same', 'same'), true)
assert.equal(secureEquals('same', 'different'), false)
assert.equal(secureEquals('', 'x'), false, 'length difference does not throw')

// --- CSV formula-injection escaping ---
const { csvCell } = loadTsModule('src/lib/security/csv.ts')

assert.equal(csvCell('plain text'), '"plain text"')
assert.equal(csvCell('say "hi"'), '"say ""hi"""')
assert.equal(csvCell('=cmd|/C calc'), `"'=cmd|/C calc"`, 'leading = is neutralized')
assert.equal(csvCell('+1-555-0100'), `"'+1-555-0100"`, 'leading + is neutralized')
assert.equal(csvCell('-negative'), `"'-negative"`, 'leading - is neutralized')
assert.equal(csvCell('@handle'), `"'@handle"`, 'leading @ is neutralized')
assert.equal(csvCell(null), '""')
assert.equal(csvCell(42), '"42"')

console.log('lead inbox auth tokens + csv escaping: ok')
