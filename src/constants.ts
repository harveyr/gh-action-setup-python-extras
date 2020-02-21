import { ProblemMatcher } from './types'

const DEFAULT_MATCHER_BANDIT: ProblemMatcher = {
  problemMatcher: [
    {
      owner: 'bandit',
      pattern: [
        {
          regexp:
            '^([^,]+),([a-z_]+),([A-Z]\\d+),([A-Z]+),([A-Z]+),([^,]+),(\\d+),(\\[\\d+\\]),(.+)$',
          file: 1,
          code: 2,
          line: 7,
          message: 6,
        },
      ],
    },
  ],
}

const DEFAULT_MATCHER_FLAKE8: ProblemMatcher = {
  problemMatcher: [
    {
      owner: 'flake8',
      pattern: [
        {
          regexp: '^(\\S+):(\\d+):(\\d+): ([A-Z]\\d+) (.+)$',
          file: 1,
          line: 2,
          column: 3,
          code: 4,
          message: 5,
        },
      ],
    },
  ],
}

const DEFAULT_MATCHER_MYPY: ProblemMatcher = {
  problemMatcher: [
    {
      owner: 'mypy',
      pattern: [
        {
          regexp: '^([\\S^:]+):(\\d+):\\s(.+)\\s\\[([a-z-]+)\\]$',
          file: 1,
          line: 2,
          message: 3,
          code: 4,
        },
      ],
    },
  ],
}

const DEFAULT_MATCHER_PYDOCSTYLE: ProblemMatcher = {
  problemMatcher: [
    {
      owner: 'pydocstyle',
      pattern: [
        {
          regexp: '^(\\S+):(\\d+) (in.+):$',
          file: 1,
          line: 2,
        },
        {
          regexp: '^.+(D\\d+): (.+)$',
          code: 1,
          message: 2,
          loop: true,
        },
      ],
    },
  ],
}

const DEFAULT_MATCHER_VULTURE: ProblemMatcher = {
  problemMatcher: [
    {
      owner: 'vulture',
      severity: 'warning',
      pattern: [
        {
          regexp: '^([^:]+):(\\d+):\\s+(.+)$',
          file: 1,
          line: 2,
          message: 3,
        },
      ],
    },
  ],
}

export const DEFAULT_MATCHERS: Map<string, ProblemMatcher> = new Map([
  ['bandit-csv', DEFAULT_MATCHER_BANDIT],
  ['flake8', DEFAULT_MATCHER_FLAKE8],
  ['mypy', DEFAULT_MATCHER_MYPY],
  ['pydocstyle', DEFAULT_MATCHER_PYDOCSTYLE],
  ['vulture', DEFAULT_MATCHER_VULTURE],
])
