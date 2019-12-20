import * as fs from 'fs'
import * as path from 'path'
import { Matcher } from './types'

const MATCHERS_PATH = path.join(__dirname, '..', '.github/matchers')

export function getMatcherPath(matcherFileName: string): string {
  const result = path.join(MATCHERS_PATH, matcherFileName)
  if (!fs.existsSync(result)) {
    throw new Error(`Matcher does not exist: ${result}`)
  }

  return result
}

export function getMatchersPaths(): string[] {
  return fs.readdirSync(MATCHERS_PATH).map(getMatcherPath)
}

export function installMatchers(): void {
  for (const matcher of getMatchersPaths()) {
    const matcherPath = path.join(MATCHERS_PATH, matcher)
    console.log(`##[add-matcher]${matcherPath}`)
  }
}

export function loadMatcherData(fpath: string): Matcher {
  return JSON.parse(fs.readFileSync(fpath).toString('utf8'))
}
