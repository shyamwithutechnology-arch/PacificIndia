import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpecialityScreen from '../../screen/speciality/SpecialityScreen';
import SpecialityDetailsScreen from '../../screen/speciality/specialityDetails/SpecialityDetailsScreen';

const Stack = createNativeStackNavigator();

const SpecialityStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Speciality" component={SpecialityScreen} />
      <Stack.Screen
        name="SpecialityDetails"
        component={SpecialityDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default SpecialityStack;
