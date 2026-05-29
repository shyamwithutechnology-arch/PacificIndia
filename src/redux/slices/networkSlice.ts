import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: true,
  isCheckingConnection: false,
  showNoInternetScreen: false,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.isConnected = action.payload;
      // Show no internet screen only if we're disconnected
      state.showNoInternetScreen = !action.payload;
    },
    setCheckingConnection: (state, action) => {
      state.isCheckingConnection = action.payload;
    },
    hideNoInternetScreen: (state) => {
      state.showNoInternetScreen = false;
    },
  },
});

export const { setNetworkStatus, setCheckingConnection, hideNoInternetScreen } =
  networkSlice.actions;
export default networkSlice.reducer;
