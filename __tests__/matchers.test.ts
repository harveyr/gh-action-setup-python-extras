import * as matchers from '../src/matchers'

test('mypy matcher', () => {
  const fpath = matchers.getMatcherPath('mypy-with-code.json')
  const data = matchers.loadMatcherData(fpath)
  const regexp = new RegExp(data.problemMatcher[0].pattern[0].regexp)
  const match = regexp.exec(
    `bingo/configuration/util.py:56: error: Incompatible return value type (got "bool", expected "str")  [return-value]`,
  )

  expect(match).toBeTruthy()
  if (!match) return

  expect(match[1]).toEqual('bingo/configuration/util.py')
  expect(match[2]).toEqual('56')
  expect(match[3].trim()).toEqual(
    `error: Incompatible return value type (got "bool", expected "str")`,
  )
  expect(match[4].trim()).toEqual(`return-value`)
})

test('flake8 matcher', () => {
  const data = matchers.loadMatcherData(matchers.getMatcherPath('flake8.json'))
  const regexp = new RegExp(data.problemMatcher[0].pattern[0].regexp)
  const match = regexp.exec(
    `bling/blang/management/commands/csv.py:73:21: F821 undefined name 'Fondu'`,
  )

  expect(match).toBeTruthy()
  if (!match) return

  expect(match[1]).toEqual('bling/blang/management/commands/csv.py')
  expect(match[2]).toEqual('73')
  expect(match[3]).toEqual('21')
  expect(match[4]).toEqual('F821')
  expect(match[5].trim()).toEqual(`undefined name 'Fondu'`)
})
