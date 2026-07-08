import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../../screen/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
