// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import productsReducer from './productsReducer';
import pokemonReducer from './pokemonReducer';
import characterReducer from './characterReducer';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  products: productsReducer,
  pokemon: pokemonReducer,
  character: characterReducer,
});
