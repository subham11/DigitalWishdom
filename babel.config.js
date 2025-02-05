// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // IMPORTANT: This plugin must be listed last.
    'react-native-reanimated/plugin',
  ],
};
