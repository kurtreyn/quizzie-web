import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import controlsReducer, { setGroups } from './controls';

export default configureStore({
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [setGroups],
  //     },
  //   });
  //   return getDefaultMiddleware();
  // },
  reducer: {
    user: userReducer,
    controls: controlsReducer,
  },
});
