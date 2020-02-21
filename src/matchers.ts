import * as fs from 'fs'
import * as path from 'path'
import { InstallToken, ProblemMatcher } from './types'
import * as core from '@actions/core'

import { DEFAULT_MATCHERS } from './constants'

const OUT_PATH = path.join(__dirname, '..', '.github/matchers')

export function getValidatedDefaultMatcher(name: string): ProblemMatcher {
  const matcher = DEFAULT_MATCHERS.get(name)
  if (!matcher) {
    throw new Error(`No matcher found with name "${name}"`)
  }
  const owner = matcher.problemMatcher[0].owner
  if (name.indexOf(owner) !== 0) {
    throw new Error(
      `Name "${name}" does not start with name "${owner}". Cowardly bailing.`,
    )
  }

  return matcher
}

export function writeMatchers(installs: InstallToken[]): string[] {
  const fpaths: string[] = []
  for (const install of installs) {
    const { matcherName, severity } = install
    const matcher = getValidatedDefaultMatcher(matcherName)
    matcher.problemMatcher.forEach(pm => {
      pm.severity = severity
    })
    const fpath = path.join(OUT_PATH, `${matcherName}.json`)

    core.info(`Writing ${fpath}`)
    fs.writeFileSync(fpath, JSON.stringify(matcher))
    fpaths.push(fpath)
  }

  return fpaths
}

// export function getMatcherPath(name: string): string {
//   const fpath = path.join(MATCHERS_PATH, `${name}.json`)
//   if (!fs.existsSync(fpath)) {
//     throw new Error(`Matcher does not exist: ${fpath}`)
//   }
//   return fpath
// }

// export function writeMatchers()

export function installMatcher(fpath: string): void {
  // Keep this log line debug because the Github Action will log the
  // installation as well.
  core.debug(`Installing matcher: ${fpath}`)
  console.log(`##[add-matcher]${fpath}`)
}
