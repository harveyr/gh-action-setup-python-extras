import * as matchers from '../src/matchers'

function getMatcherRegexps(name: string): RegExp[] {
  const matcher = matchers.getValidatedDefaultMatcher(name)
  return matcher.problemMatcher[0].pattern.map(p => {
    return new RegExp(p.regexp)
  })
}

test('mypy matcher', () => {
  const regexp = getMatcherRegexps('mypy')[0]
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
  const regexp = getMatcherRegexps('flake8')[0]
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

test('bandit matcher', () => {
  const regexp = getMatcherRegexps('bandit-csv')[0]
  // (1)filename,(2)test_name,(3)test_id,(4)issue_severity,(5)issue_confidence,(6)issue_text,(7)line_number,(8)line_range,(9)more_info
  const match = regexp.exec(
    `blarbl/farbl/views.py,hardcoded_password_string,B105,LOW,MEDIUM,Possible hardcoded password: 'Super-secret!',3154,[3154],https://bandit.readthedocs.io/en/latest/plugins/b105_hardcoded_password_string.html`,
  )

  expect(match).toBeTruthy()
  if (!match) return

  expect(match[1]).toEqual('blarbl/farbl/views.py')
  expect(match[2]).toEqual('hardcoded_password_string')
  expect(match[3]).toEqual('B105')
  expect(match[4]).toEqual('LOW')
  expect(match[5]).toEqual('MEDIUM')
  expect(match[6]).toEqual(`Possible hardcoded password: 'Super-secret!'`)
  expect(match[7]).toEqual('3154')
  expect(match[8]).toEqual('[3154]')
  expect(match[9]).toEqual(
    'https://bandit.readthedocs.io/en/latest/plugins/b105_hardcoded_password_string.html',
  )
})

test('vulture matcher', () => {
  const regexp = getMatcherRegexps('vulture')[0]
  const match = regexp.exec(
    `fondu/dip/models.py:4498: unused property 'vendor_name' (60% confidence, 10 lines)`,
  )

  expect(match).toBeTruthy()
  if (!match) return

  expect(match[1]).toEqual('fondu/dip/models.py')
  expect(match[2]).toEqual('4498')
  expect(match[3]).toEqual(
    `unused property 'vendor_name' (60% confidence, 10 lines)`,
  )
})
