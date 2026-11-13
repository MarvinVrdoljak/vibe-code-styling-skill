/**
 * Stylelint — enforces the CSS architecture mechanically, so the rules don't
 * depend on anyone (human or model) remembering them.
 */
module.exports = {
  extends: ['stylelint-config-standard'],
  // Build output and deps are not source — never lint them.
  ignoreFiles: ['.next/**', 'out/**', 'node_modules/**'],
  rules: {
    // Force design tokens: no raw colors in component/page CSS — use var(--…).
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],
    // Force px in source; postcss-pxtorem converts to rem. Never hand-write rem.
    'unit-disallowed-list': ['rem'],
    // No deep descendant nesting in modules — only &-nesting + @media.
    'max-nesting-depth': [1, {ignoreAtRules: ['media', 'supports', 'layer']}],
    // Plain string imports (postcss-import / Next resolve them).
    'import-notation': 'string',
    // CSS Modules use camelCase / kebab classes freely; don't fight them.
    'selector-class-pattern': null,
    'custom-media-pattern': null,
    'custom-property-pattern': null,
    // postcss-custom-media / preset-env syntax stylelint can't natively parse —
    // don't flag @custom-media or `@media (--bp-…)` references as errors.
    'at-rule-no-unknown': [true, {ignoreAtRules: ['custom-media']}],
    'media-feature-name-no-unknown': null,
  },
  overrides: [
    {
      // CSS Modules: one semantic class per element. No descendant/child
      // selectors (.root li, .root > a), no bare tag selectors, no :global.
      files: ['**/*.module.css'],
      rules: {
        'selector-max-combinators': 0,
        'selector-max-type': 0,
        'selector-pseudo-class-disallowed-list': ['global'],
      },
    },
    {
      // tokens.css legitimately defines raw colors and rem-in-clamp().
      files: ['**/styles/base/tokens.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
        'unit-disallowed-list': null,
      },
    },
  ],
}
