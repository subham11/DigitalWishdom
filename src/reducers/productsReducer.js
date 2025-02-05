// src/reducers/productsReducer.js
const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  }
  