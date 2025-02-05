// src/reducers/pokemonReducer.js
const initialState = {
    loading: false,
    pokemon: [],
    error: null,
  };
  
  export default function pokemonReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_POKEMON_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_POKEMON_SUCCESS':
        return { ...state, loading: false, pokemon: action.payload };
      case 'FETCH_POKEMON_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  }
  