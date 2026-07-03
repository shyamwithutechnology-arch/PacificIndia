import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { LoginSceen } from './src/screen/auth/login';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import { Provider, useSelector } from 'react-redux';
import RootNavigator from './src/navigation/stacks/RootStack';
import HomeScreen from './src/screen/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';
import { RootState } from './src/redux/rootReducer/rootReducer';
import NoInternetScreen from './src/screen/noInternate/NoInternetScreen';
import NetworkListener from 'src/component/NetworkListener';

const App = () => {
  // const { showNoInternetScreen, isCheckingConnection } = useSelector(
  //   (state: RootState) => state.network,
  // );

  // // Show loading while checking initial connection
  // if (isCheckingConnection) {
  //   return (
  //     <View style={styles.isChecking}>
  //       <ActivityIndicator size="large" color="#007AFF" />
  //     </View>
  //   );
  // }

  // // Show no internet screen if disconnected
  // if (showNoInternetScreen) {
  //   return <NoInternetScreen />;
  // }
  // <NetworkListener>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </Provider>
        <Toast config={toastConfig as any} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
    // </NetworkListener>
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
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import React from 'react';
// // import { LoginSceen } from './src/screen/auth/login';
// import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { store } from './src/redux/store/store';
// import { Provider, useSelector } from 'react-redux';
// import RootNavigator from './src/navigation/stacks/RootStack';
// import HomeScreen from './src/screen/home/HomeScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import { toastConfig } from './src/utils/toastConfig';
// import { RootState } from './src/redux/rootReducer/rootReducer';
// import NoInternetScreen from './src/screen/noInternate/NoInternetScreen';
// import NetworkListener from 'src/component/NetworkListener';

// const App = () => {
//   // const { showNoInternetScreen, isCheckingConnection } = useSelector(
//   //   (state: RootState) => state.network,
//   // );

//   // // Show loading while checking initial connection
//   // if (isCheckingConnection) {
//   //   return (
//   //     <View style={styles.isChecking}>
//   //       <ActivityIndicator size="large" color="#007AFF" />
//   //     </View>
//   //   );
//   // }

//   // // Show no internet screen if disconnected
//   // if (showNoInternetScreen) {
//   //   return <NoInternetScreen />;
//   // }
//   // <NetworkListener>

//   return (
//     <SafeAreaProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <NavigationContainer>
//           <RootNavigator />
//           <Toast config={toastConfig} />
//         </NavigationContainer>
//       </GestureHandlerRootView>
//     </SafeAreaProvider>
//     // </NetworkListener>
//     // <SafeAreaProvider style={styles.container}>
//     //   <HomeScreen />
//     // </SafeAreaProvider>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
