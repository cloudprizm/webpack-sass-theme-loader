import { RunnableTheme, resolvers } from '@hungry/bulma-theme'
import { traverseModuleRules, RuleSetRule, ruleSetUse, test } from '@hungry/webpack-parts'
import { ifElse, identity } from 'ramda'
import decamelize from 'decamelize'

const onlyPlainVars = (d: unknown) =>
  typeof d === 'string'
  || typeof d === 'number'
  || typeof d === 'boolean'

export const revertCamelCaseWithSizes = (str: string) =>
  decamelize(str, '-')
    .replace(/\_/g, '-')

export const toBulmaVariables = (theme: Record<string, any>): Record<string, unknown> =>
  Object
    .keys(theme)
    .filter(key => onlyPlainVars(theme[key]))
    .reduce((acc, camelCasedKey) => ({
      ...acc,
      [revertCamelCaseWithSizes(camelCasedKey)]: theme[camelCasedKey]
    }), {})

export const makeSassLoader = (theme: RunnableTheme) => ({
  loader: '@epegzz/sass-vars-loader',
  options: {
    syntax: 'sass',
    vars: theme.map(toBulmaVariables).run(resolvers)
  }
})

export const checkIfSass = ({ test: rule }: RuleSetRule) =>
  typeof rule === 'string'
    ? test.sass.test(rule)
    : rule instanceof RegExp
      ? rule.test('.sass')
      : false

export const ruleUseToArray = (rule: RuleSetRule['use']) =>
  typeof rule === 'string'
    ? [rule]
    : Array.isArray(rule)
      ? rule
      : []

export const injectSassVars = (theme: RunnableTheme) => ifElse(
  checkIfSass,
  ruleSetUse
    .modify(use => ruleUseToArray(use)
      .concat([makeSassLoader(theme)])),
  identity
)

export const injectSassVarLoader = (theme: RunnableTheme) =>
  traverseModuleRules
    .modify(injectSassVars(theme))

export const enableSassTheming = injectSassVarLoader