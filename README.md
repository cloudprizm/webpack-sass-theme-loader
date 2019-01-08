`webpack-sass-theme-loader`
===

This library has 3 goals
* running and passing `@hungry/bulma-theme` to `sass-var-loader`
* detecting automatically `sass` rule within `webpack` config and inject it into the correct place
* `decamelize` all `theme` variables and transform theme before applying it to `sass-var-loader`

### How to use

#### Using with  `@hungry/bulma-theme`
To apply on webpack config object you need to provide `theme` and `config` like so,
```ts
  import { enableSassTheming } from '@hungry/webpack-sass-theme-loader'
  import { theme } from '@hungry/bulma-theme'

  const webpackConfig = {} 
  const withEmbededTheme = enableSassTheming(theme)(webpackConfig)
```

#### Custom theme from scratch
Follow `@hungry/bulma-theme` - provide similar interface, this is `type RunnableTheme = Reader<InjectedMethods, BulmaTheme>` or just `reader.of({/* your camelcased variables */})`

### Implementation details
[`@hungry/bulma-theme`](https://github.com/hungry-consulting/bulma-theme) is a `wrapped function` by [`Reader monad`](https://github.com/gcanti/fp-ts/blob/master/test/Reader.ts) - which provide ability to `mapping` and `chaining`.
This is, you can remap any `variable` by using `map` or `chain`, but at this level such changes are not necessary as any alteration should be part of theming function.


