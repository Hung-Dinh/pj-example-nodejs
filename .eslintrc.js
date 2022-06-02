module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    camelcase: 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'max-len': ['error', { code: 500 }],
    'no-shadow': 'off',
    'no-process-env': 'off',
    'no-unused-expressions': 'off',
    'new-cap': 0,
  },
};
