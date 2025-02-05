
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    // Assuming the API returns an object with a "products" array.
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', error: error.toString() });
  }
};
