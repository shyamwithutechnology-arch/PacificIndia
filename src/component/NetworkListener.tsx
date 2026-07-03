// components/NetworkListener.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  setCheckingConnection,
  setNetworkStatus,
} from '../redux/slices/networkSlice';

const NetworkListener = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial check
    const checkInitialConnection = async () => {
      dispatch(setCheckingConnection(true));
      const state = await NetInfo.fetch();
      dispatch(setNetworkStatus(state.isConnected));
      dispatch(setCheckingConnection(false));
    };

    checkInitialConnection();

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setNetworkStatus(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return children;
};

export default NetworkListener;
