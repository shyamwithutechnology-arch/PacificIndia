import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyVisitScreen from '../../screen/dailyVisit/DailyVisitScreen';
import SelectDoctorScreen from '../../screen/dailyVisit/selectDoctor/SelectDoctorScreen';

const Stack = createNativeStackNavigator();

const DailyVisitStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DailyVisit" component={DailyVisitScreen} />
      <Stack.Screen name="SelectDoctor" component={SelectDoctorScreen} />
    </Stack.Navigator>
  );
};

export default DailyVisitStack;
