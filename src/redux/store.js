import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import controlsReducer from './controls';

export default configureStore({
  reducer: {
    user: userReducer,
    controls: controlsReducer,
  },
});
