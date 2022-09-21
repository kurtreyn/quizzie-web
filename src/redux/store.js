import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userReducer from './user';
import controlsReducer from './controls';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    controls: controlsReducer,
  },
});
