import * as kit from '@harveyr/github-actions-kit'
import { InstallToken, Severity } from './types'

export function parseInstallInput(s: string): InstallToken[] {
  const result: InstallToken[] = []

  const validSeverities = ['warning', 'error']

  const tokens = kit.tokenize(s)
  console.log('tokens', tokens)
  for (const token of tokens) {
    const parts = token.split(':')
    if (parts.length !== 2) {
      throw new Error(`Invalid install token: ${token}`)
    }
    const [matcherName, severity] = parts
    if (!validSeverities.includes(severity)) {
      throw new Error(
        `Invalid install token: ${token} (invalid severity "${severity}")`,
      )
    }

    result.push({ matcherName, severity: severity as Severity })
  }

  console.log('result', result)
  return result
}
