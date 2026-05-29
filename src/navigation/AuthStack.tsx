import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/auth/login/LoginScreen';
import OtpRequestScreen from '../screen/auth/optRequest/OtpRequestScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpRequest" component={OtpRequestScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
