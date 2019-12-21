export interface Matcher {
  problemMatcher: {
    owner: string
    pattern: {
      regexp: string
      file: number
      line: number
      message: number
      code: number
    }[]
  }[]
}
