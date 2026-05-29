import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { colors } from '../../theme';
import {
  hideNoInternetScreen,
  setCheckingConnection,
} from '../../redux/slices/networkSlice';
import { styles } from './styles';
import { Icons } from '../../assets/icons';

const NoInternetScreen = () => {
  const dispatch = useDispatch();
  const { isCheckingConnection } = useSelector((state) => state.network);

  const handleRetry = async () => {
    dispatch(setCheckingConnection(true));

    // Check network connection
    const state = await NetInfo.fetch();
    dispatch(setCheckingConnection(false));

    // If connected, hide the screen
    if (state.isConnected) {
      dispatch(hideNoInternetScreen());
    }
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.black}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {/* <Text style={styles.icon}>🌐</Text> */}
            <Image source={Icons.noWifi} style={styles.icon} />
          </View>

          <Text style={styles.title}>Whoops!</Text>

          <Text style={styles.message}>
            No Internet connection found.{'\n'}
            Check your connection or try again.
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
            disabled={isCheckingConnection}
          >
            {isCheckingConnection ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.retryButtonText}>Refresh</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NoInternetScreen;
