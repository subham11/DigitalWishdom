// src/reducers/characterReducer.js
const initialState = {
    loading: false,
    character: null,
    error: null,
  };
  
  export default function characterReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_CHARACTER_REQUEST':
        return { ...state, loading: true, error: null, character: null };
      case 'FETCH_CHARACTER_SUCCESS':
        return { ...state, loading: false, character: action.payload };
      case 'FETCH_CHARACTER_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  }
  