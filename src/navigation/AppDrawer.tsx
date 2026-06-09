import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import { Dimensions } from 'react-native';
import ProfileScreen from '../screen/profile/ProfileScreen';
import PrivacyPolicyScreen from '../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../screen/termandcondition/TermandconditionScreen';
import AboutUsScreen from '../screen/aboutus/AboutUsScreen';
import SubscriptionScreen from '../screen/subscription/SubscriptionScreen';
import CustomDrawerContent from '../component/DrawerContent/CustomDrawerContent';
import AppointMentsScreen from '../screen/appointments/AppointMentsScreen';
import AddAppointMentScreen from '../screen/appointments/addAppointMent/AddAppointMentScreen';
import AppointMentDetailsScreen from '../screen/appointments/appointMentDetails/AppointMentDetailsScreen';
import SupportTicketScreen from '../screen/support/SupportTicketScreen';
import NotificationScreen from '../screen/notification/NotificationScreen';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front', // 👈 drawer comes over screen
        drawerStyle: {
          width: width, // 👈 FULL SCREEN
        },
        overlayColor: 'rgba(0,0,0,0.5)', // 👈 background dim
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="AppointMents" component={AppointMentsScreen} />
      <Drawer.Screen name="AddAppointMent" component={AddAppointMentScreen} />
      <Drawer.Screen
        name="AppointMentDetails"
        component={AppointMentDetailsScreen}
      />

      <Drawer.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Drawer.Screen
        name="TermandconditionScreen"
        component={TermandconditionScreen}
      />
      <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Drawer.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Drawer.Screen name="SupportTicket" component={SupportTicketScreen} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
