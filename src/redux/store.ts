// import { configureStore } from '@reduxjs/toolkit';
// import { rootReducer } from './RootReducer/rootReducer';

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { rootReducer } from './RootReducer/rootReducer';
import { reduxStorage } from '../storage/storage';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'], // persist only auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
