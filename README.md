### Attaching loader to webpack config

apply on webpack config object
```ts
  import { enableSassTheming } from '@hungry/webpack-sass-theme-loader'
  import { Theme } from '@hungry/bulma-styled-theme'
  const webpackConfig = {}
  const withEmbededTheme = enableSassTheming(theme)(webpackConfig)
```

you can check details within test files.