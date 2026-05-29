import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from '../store/store';
// future reducers here
// import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
