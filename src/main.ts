import * as core from '@actions/core'
import * as matchers from './matchers'

async function run(): Promise<void> {
  matchers.installMatchers()
}

run().catch(err => {
  core.setFailed(`${err}`)
})
