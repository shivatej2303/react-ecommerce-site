import { createSlice } from '@reduxjs/toolkit';

// Initial state (try to load from localStorage if available)
const initialState = {
  user: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user data (login/signup success)
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); // Persist
    },
    // Action to clear user data (logout)
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('currentUser'); // Clear persisted
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;