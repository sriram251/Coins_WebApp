import {createSlice} from "@reduxjs/toolkit"

const storedAuthState = JSON.parse(localStorage.getItem('authState'));

const authSlice = createSlice({
    name: 'auth',
    initialState: storedAuthState ||{
      token: null,
      email: null,
      isAuthenticated: false,
      username:null
    },
    reducers: {
      loginSuccess: (state, action) => {
        state.token = action.payload.access_token;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.username = action.payload.username;
      },
      logout: (state) => {
        state.token = null;
        state.email = null;
        state.isAuthenticated = false;
        state.username = null
      },
    },
  });

export const { loginSuccess, logout } = authSlice.actions;
export const authMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('authState', JSON.stringify(state.auth));
    return result;
  };
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;