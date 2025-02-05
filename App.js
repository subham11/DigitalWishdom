// App.js
import 'react-native-gesture-handler'; // Ensure this is at the top if not using Expo.
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n'; // Initialize i18next

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
