import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';
import PrivacyPolicyScreen from '../../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../../screen/termandcondition/TermandconditionScreen';
import { localStorage, storageKeys } from '../../storage/storage';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const loadApp = async () => {
      const token = await localStorage.getItem(storageKeys.fcm_token);

      timer = setTimeout(() => {
        setFcmToken(token);
        setIsLoading(false);
      }, 2000);
    };

    loadApp();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  console.log('fcmToken', fcmToken);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={fcmToken ? 'AppDrawer' : 'AuthStack'}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />

      <Stack.Screen name="AppDrawer" component={AppDrawer} />

      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />

      <Stack.Screen
        name="TermandconditionScreen"
        component={TermandconditionScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
