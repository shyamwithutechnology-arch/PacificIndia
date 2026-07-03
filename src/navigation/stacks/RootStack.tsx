import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';
import TermandconditionScreen from '../../screen/termandcondition/TermandconditionScreen';
import { localStorage, storageKeys } from '../../storage/storage';
import PrivacyPolicyScreen from '../../screen/privacyPolicy/PrivacyPolicyScreen';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/RootReducer/rootReducer';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};
export default RootStack;

// const RootStack = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [fcmToken, setFcmToken] = useState<string | null>(null);
//   useEffect(() => {
//     let timer: ReturnType<typeof setTimeout>;

//     const loadApp = async () => {
//       const token = await localStorage.getItem(storageKeys.fcm_token);

//       timer = setTimeout(() => {
//         setFcmToken(token);
//         setIsLoading(false);
//       }, 2000);
//     };

//     loadApp();

//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }
//   console.log('fcmToken', fcmToken);

//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={fcmToken ? 'AppDrawer' : 'AuthStack'}
//     >
//       <Stack.Screen name="AuthStack" component={AuthStack} />

//       <Stack.Screen name="AppDrawer" component={AppDrawer} />

//       <Stack.Screen
//         name="PrivacyPolicyScreen"
//         component={PrivacyPolicyScreen}
//       />

//       <Stack.Screen
//         name="TermandconditionScreen"
//         component={TermandconditionScreen}
//       />
//     </Stack.Navigator>
//   );
// };

// export default RootStack;
