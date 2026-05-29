import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screen/home/HomeScreen';
import NotificationScreen from '../../screen/notification/NotificationScreen';
import SpecialityScreen from '../../screen/speciality/SpecialityScreen';
import DoctorlistScreen from '../../screen/doctorlist/DoctorlistScreen';
import DoctorDetailsScreen from '../../screen/doctorlist/doctorDetails/DoctorDetailsScreen';
// import PdfPreviewScreen from '../../screen/mypdf/PDFPreviewScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="Doctorlist" component={DoctorlistScreen} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
