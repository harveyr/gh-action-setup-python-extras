import * as core from '@actions/core'
import { parseMatchers } from './input'
import { installMatcher, writeMatchers } from './matchers'

async function run(): Promise<void> {
  const matchers = parseMatchers(core.getInput('matchers', { required: true }))
  const fpaths = writeMatchers(matchers)
  fpaths.map(installMatcher)
}

run().catch(err => {
  core.setFailed(`${err}`)
})
