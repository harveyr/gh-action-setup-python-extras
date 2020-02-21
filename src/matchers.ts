import * as fs from 'fs'
import * as path from 'path'
import { Matcher } from './types'
import * as core from '@actions/core'

const MATCHERS_PATH = path.join(__dirname, '..', '.github/matchers')

export function getMatcherPath(name: string): string {
  const fpath = path.join(MATCHERS_PATH, `${name}.json`)
  if (!fs.existsSync(fpath)) {
    throw new Error(`Matcher does not exist: ${fpath}`)
  }
  return fpath
}

export function installMatchers(names: string[]): void {
  for (const name of names) {
    // Keep this log line debug because the Github Action will log the
    // installation as well.
    core.debug(`Installing matcher: ${name}`)
    const fpath = getMatcherPath(name)
    console.log(`##[add-matcher]${fpath}`)
  }
}

export function loadMatcherData(fpath: string): Matcher {
  return JSON.parse(fs.readFileSync(fpath).toString('utf8'))
}
