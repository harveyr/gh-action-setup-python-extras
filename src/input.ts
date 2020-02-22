import * as kit from '@harveyr/github-actions-kit'
import { InstallToken, Severity } from './types'
import { VALID_SEVERITIES } from './constants'

/**
 * Parse and validate the raw input string from the `matchers` param.
 */
export function parseMatchers(s: string): InstallToken[] {
  const result: InstallToken[] = []

  const tokens = kit.tokenize(s)
  for (const token of tokens) {
    const parts = token.split(':')
    if (parts.length !== 2) {
      throw new Error(`Invalid install token: ${token}`)
    }
    const matcherName = parts[0]
    const severity = parts[1] as Severity
    if (!VALID_SEVERITIES.includes(severity)) {
      throw new Error(
        `Invalid install token: ${token} (invalid severity "${severity}")`,
      )
    }

    result.push({ matcherName, severity: severity as Severity })
  }

  return result
}
