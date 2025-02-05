// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

// Redux Toolkit automatically includes redux-thunk middleware,
// sets up the Redux DevTools extension (in development),
// and applies other helpful defaults.
const store = configureStore({
  reducer: rootReducer,
});

export default store;
