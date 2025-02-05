// src/actions/authActions.js
export const login = (username, password) => dispatch => {
    // Dummy login logic; in a real app you would authenticate against an API.
    if (username && password) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { username } });
    }
  };

  export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
  };