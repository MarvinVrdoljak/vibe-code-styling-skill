module.exports = {
  plugins: {
    'postcss-import': {},
    '@csstools/postcss-global-data': {
      files: ['./styles/base/media.css'],
    },
    'postcss-custom-media': {},
    'postcss-preset-env': {stage: 2, features: {'cascade-layers': false}},
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      // Values below 2px (hairline borders) stay px so they never render as
      // sub-pixel rem values. No selectorBlackList: the root font-size is
      // never set (see base.css), and pxtorem's string blacklist would match
      // substrings like `.bodyText` anyway.
      minPixelValue: 2,
    },
  },
}
