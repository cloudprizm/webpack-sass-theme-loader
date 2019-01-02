import { checkIfSass, toBulmaVariables, enableSassTheming } from './sass-loader'
import { Theme } from '@hungry/bulma-styled-theme'

test('check if sass', () => {
  const sassExtension = checkIfSass({ test: '.sass' })
  const sassRegexp = checkIfSass({ test: /\.s(a|c)ss$/ })

  expect(sassExtension).toBeTruthy()
  expect(sassRegexp).toBeTruthy()
})

test('convert to sass variables', () => {
  const plain = {
    black: '#000',
    hasSth: true,
    width: 10,
    size_1: 10
  }
  const lists = {
    colors: {
      black: '#0000'
    },
    sizes: [10]
  }
  const variables = toBulmaVariables({
    ...plain,
    ...lists
  })
  expect(Object.keys(variables)).toEqual(['black', 'has-sth', 'width', 'size-1'])

  expect(variables.colors).toBeUndefined()
  expect(variables.sizes).toBeUndefined()

  expect(variables).toMatchSnapshot()
})

test('embed sass loader on arbitrary webpack config', () => {
  const webpackConfig = {
    module: {
      rules: [{
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    }
  }
  const withEmbededTheme = enableSassTheming(theme)(webpackConfig)
  // @ts-ignore
  const getLastChild = withEmbededTheme.module.rules[0].use[3]
  expect(getLastChild.options.vars).not.toBeNull()
})