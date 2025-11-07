/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  proseWrap: 'preserve',

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrder: [
    '^react$', // keep React imports first
    '^@?\\w', // packages (e.g. react, lodash, axios)
    '^@/(.*)$', // absolute imports (if you use @ alias)
    '^[./]', // relative imports
  ],
  importOrderSeparation: true, // add newlines between import groups
  importOrderSortSpecifiers: true, // sort named imports (e.g. { a, b, c })
  importOrderCaseInsensitive: true, // sort imports regardless of case
};

export default config;
