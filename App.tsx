import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
// import { LoginSceen } from './src/screen/auth/login';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store/store';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/stacks/RootStack';
import HomeScreen from './src/screen/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigator />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    // <SafeAreaProvider style={styles.container}>
    //   <HomeScreen />
    // </SafeAreaProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
