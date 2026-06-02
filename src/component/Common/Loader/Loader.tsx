import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const Loader = ({ visible = true, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.loaderBox}>
        {/* React Native's built-in spinning loader */}
        <ActivityIndicator size="small" color="#007AFF" />
        {message ? <Text style={styles.text}>{message}</Text> : null}
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    // Spans the full screen
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed overlay background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensures it sits on top of all other components
  },
  loaderBox: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
    // Adds a subtle shadow for iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});
