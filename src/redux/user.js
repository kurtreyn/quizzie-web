import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setUserAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAuth } = userSlice.actions;

export default userSlice.reducer;
