import * as core from '@actions/core'
import * as path from 'path'

const MATCHERS_PATH = path.join(__dirname, '..', '.github/matchers')

async function run(): Promise<void> {
  const matchers = ['mypy-with-code.json']

  for (const matcher of matchers) {
    const matcherPath = path.join(MATCHERS_PATH, matcher)
    console.log(`##[add-matcher]${matcherPath}`)
  }
}

run().catch(err => {
  core.setFailed(`${err}`)
})
