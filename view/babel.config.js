module.exports = {
  presets: ['flow', 'module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['react-native-web', { commonjs: true }],
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
};
