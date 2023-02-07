import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth.slice';
//import itemReducer from './item.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //item: itemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});