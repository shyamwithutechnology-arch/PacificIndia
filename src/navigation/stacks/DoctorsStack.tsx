import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screen/home/HomeScreen';
import DoctorlistScreen from '../../screen/doctorlist/DoctorlistScreen';
import DoctorDetailsScreen from '../../screen/doctorlist/doctorDetails/DoctorDetailsScreen';
import AddDoctorScreen from '../../screen/doctorlist/addDoctor/AddDoctorScreen';
import MedicenListScreen from '../../screen/doctorlist/medicenList/MedicenListScreen';

const Stack = createNativeStackNavigator();

const DoctorsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Doctorlist" component={DoctorlistScreen} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
      <Stack.Screen name="MedicenList" component={MedicenListScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctorScreen} />
    </Stack.Navigator>
  );
};

export default DoctorsStack;
