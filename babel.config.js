module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@stores': './src/stores',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@models': './src/models',
        },
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
