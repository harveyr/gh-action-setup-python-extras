import * as core from '@actions/core'
import * as matchers from './matchers'

import { parseInstallInput } from './input'

async function run(): Promise<void> {
  const installs = parseInstallInput(
    core.getInput('install', { required: true }),
  )
  const fpaths = matchers.writeMatchers(installs)
  fpaths.map(matchers.installMatcher)
}

run().catch(err => {
  core.setFailed(`${err}`)
})
