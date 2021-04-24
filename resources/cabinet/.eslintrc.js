module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    'lodash'
  ],
  globals: {
    "Vue": false,
    "moment": true,
    "form": true,
    "window": true,
    "helper": true,
    "router": true,
    "toastr": true,
    "auth": true,
    "process": true,
    "localStorage": true
  },
  extends: [
    'plugin:lodash/recommended',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
    'prettier',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 'off',
    'max-len': 'off',
    'linebreak-style': 0,
    'semi': [2, 'never'],
    'indent': ['error', 2],
    'eol-last': 0,
    'comma-dangle': 0,
    'object-shorthand': 0,
    'no-restricted-globals': ['off', 'location'],
    'no-unused-vars': [0, {
      'args': 'none'
    }],
    'no-underscore-dangle': 0,
    'import/no-unresolved': [0, {
      'commonjs': false,
      'amd': false
    }],
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'no-restricted-syntax': ['error', 'BinaryExpression[operator="in"]'],
    'radix': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'prefer-destructuring': 0,
    /*'vue/html-indent': ['error', 2, {
      'ignoredNodes': ['ConditionalExpression']
    }],*/
    'no-param-reassign': [2, {
      'props': false
    }],
    'no-unneeded-ternary': ['error', {
      'defaultAssignment': false
    }],
    'vue/name-property-casing': 0,
    'vue/max-attributes-per-line': [
      2, {
        'singleline': 1,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/html-self-closing': [
      'error', {
        'html': {
          'void': 'never',
          'normal': 'always',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}