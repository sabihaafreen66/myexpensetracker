// actions/authActions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (token, userId) => ({
  type: LOGIN,
  payload: { token, userId }
});

export const logout = () => ({
  type: LOGOUT
});
