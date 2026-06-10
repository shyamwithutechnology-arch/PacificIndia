import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const Loader = ({ visible = true, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#0093D3" />
      </View>
    </View>
  );
};

// {message ? <Text style={styles.text}>{message}</Text> : null}
export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    // elevation: 9999,
  },
  loaderBox: {
    // backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
    // elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
