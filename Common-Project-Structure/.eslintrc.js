module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unescaped-entities': 'off',
    'object-shorthand': 'off',
    'prefer-const': 'off',
    'import/first': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    // You can override any rules you want
  },
  env: {
    browser: true,
  },
  globals: {
    document: false,
  },
  parser: 'babel-eslint',
};
