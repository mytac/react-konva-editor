module.exports = {
  extends: ['react-app'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 1,
    'max-len': [1, 160],
    'no-fallthrough': [0],
  },
  env: {
    es6: true,
    browser: true,
  },
};
