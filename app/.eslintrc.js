// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 2,
    // 'react-native/no-color-literals': 2,
    'react-native/no-raw-text': [
      'error',
      {
        skip: ['MainText'],
      },
    ],
    // 'react-native/no-single-element-style-arrays': 2,
    'react/jsx-key': 2,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
  },
};
