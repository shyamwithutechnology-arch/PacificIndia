import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import { Dimensions } from 'react-native';
import TermandconditionScreen from '../screen/termandcondition/TermandconditionScreen';
import AboutUsScreen from '../screen/aboutus/AboutUsScreen';
import SubscriptionScreen from '../screen/subscription/SubscriptionScreen';
import CustomDrawerContent from '../component/DrawerContent/CustomDrawerContent';
import AppointMentsScreen from '../screen/appointments/AppointMentsScreen';
import AddAppointMentScreen from '../screen/appointments/addAppointMent/AddAppointMentScreen';
import AppointMentDetailsScreen from '../screen/appointments/appointMentDetails/AppointMentDetailsScreen';
import SupportTicketScreen from '../screen/support/SupportTicketScreen';
import NotificationScreen from '../screen/notification/NotificationScreen';
import PrivacyPolicyScreen from '../screen/privacyPolicy/PrivacyPolicyScreen';
import ReportScreen from '../../src/screen/report/ReportScreen';
import ReportListScreen from '../screen/report/reportHistory/ReportHistoryScreen';

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

      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="ReportList" component={ReportListScreen} />

      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Drawer.Screen
        name="Termandcondition"
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

// <Drawer.Screen name="AppointMents" component={AppointMentsScreen} />
// <Drawer.Screen name="AddAppointMent" component={AddAppointMentScreen} />
// <Drawer.Screen
//   name="AppointMentDetails"
//   component={AppointMentDetailsScreen}
// />
