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

const { computeStripeSignature, verifyStripeSignature, SIGNATURE_TOLERANCE_SECONDS } = loadTsModule(
  'src/lib/commerce/stripe-signature.ts'
)

const secret = 'whsec_test_secret'
const body = JSON.stringify({ id: 'evt_1', type: 'checkout.session.completed' })
const nowMs = 1_800_000_000_000
const nowSeconds = Math.floor(nowMs / 1000)

function header(ts_, sig) {
  return `t=${ts_},v1=${sig}`
}

// A correctly signed, fresh payload verifies.
const freshSig = computeStripeSignature(body, nowSeconds, secret)
assert.equal(verifyStripeSignature(body, header(nowSeconds, freshSig), secret, nowMs), true)

// The same signed payload replayed after the tolerance window is rejected.
const staleTs = nowSeconds - SIGNATURE_TOLERANCE_SECONDS - 1
const staleSig = computeStripeSignature(body, staleTs, secret)
assert.equal(verifyStripeSignature(body, header(staleTs, staleSig), secret, nowMs), false)

// A payload "from the future" beyond tolerance is rejected too.
const futureTs = nowSeconds + SIGNATURE_TOLERANCE_SECONDS + 1
const futureSig = computeStripeSignature(body, futureTs, secret)
assert.equal(verifyStripeSignature(body, header(futureTs, futureSig), secret, nowMs), false)

// Inside the tolerance window still verifies.
const edgeTs = nowSeconds - SIGNATURE_TOLERANCE_SECONDS + 5
const edgeSig = computeStripeSignature(body, edgeTs, secret)
assert.equal(verifyStripeSignature(body, header(edgeTs, edgeSig), secret, nowMs), true)

// Wrong secret, tampered body, malformed headers, junk timestamps: all rejected.
assert.equal(verifyStripeSignature(body, header(nowSeconds, computeStripeSignature(body, nowSeconds, 'whsec_other')), secret, nowMs), false)
assert.equal(verifyStripeSignature(body + 'x', header(nowSeconds, freshSig), secret, nowMs), false)
assert.equal(verifyStripeSignature(body, 'not-a-signature-header', secret, nowMs), false)
assert.equal(verifyStripeSignature(body, header('not-a-number', freshSig), secret, nowMs), false)
assert.equal(verifyStripeSignature(body, `t=${nowSeconds}`, secret, nowMs), false)
assert.equal(verifyStripeSignature(body, `v1=${freshSig}`, secret, nowMs), false)

console.log('stripe webhook signature verification: ok')
