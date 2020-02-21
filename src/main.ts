import * as core from '@actions/core'
import * as matchers from './matchers'
import * as kit from '@harveyr/github-actions-kit'

async function run(): Promise<void> {
  const matcherNames: string[] = kit.tokenize(
    core.getInput('install', { required: true }),
  )
  return matchers.installMatchers(matcherNames)
}

run().catch(err => {
  core.setFailed(`${err}`)
})
