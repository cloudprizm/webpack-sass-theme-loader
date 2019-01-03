`webpack-sass-theme-loader`

As `theme` is a wrapped function, this library is encapsulating run of this function and passing to `sass-var-loader`. 
You can remap any `variable` before passing it to `enableSassTheming` - or provide you own `theme`.

### How to run it

apply on webpack config object
```ts
  import { enableSassTheming } from '@hungry/webpack-sass-theme-loader'
  import { theme } from '@hungry/bulma-theme'

  const webpackConfig = {} // your config file
  const withEmbededTheme = enableSassTheming(theme)(webpackConfig)
```

You can check details within test files.