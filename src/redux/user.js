import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    userInfo: null,
  },
  reducers: {
    setUserAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAuth, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
