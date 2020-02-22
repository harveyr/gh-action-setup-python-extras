import {} from '@harveyr/github-actions-kit'

export type Severity = 'warning' | 'error'

export interface ProblemMatcher {
  problemMatcher: {
    owner: string
    severity?: Severity
    pattern: {
      regexp: string
      file?: number
      line?: number
      column?: number
      message?: number
      code?: number
      loop?: boolean
    }[]
  }[]
}

export interface InstallToken {
  matcherName: string
  severity: Severity
}
