// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import locationReducer from '../Slices/locationSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
