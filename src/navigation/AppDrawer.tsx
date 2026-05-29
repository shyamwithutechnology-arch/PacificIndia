import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import { Dimensions } from 'react-native';
import ProfileScreen from '../screen/profile/ProfileScreen';
import PrivacyPolicyScreen from '../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../screen/termandcondition/TermandconditionScreen';
import AboutUsScreen from '../screen/aboutus/AboutUsScreen';
import SubscriptionScreen from '../screen/subscription/SubscriptionScreen';
import SupportScreen from '../screen/support/SupportScreen';
import CustomDrawerContent from '../component/DrawerContent/CustomDrawerContent';
import DailyVisitScreen from '../screen/dailyVisit/DailyVisitScreen';

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
      <Drawer.Screen name="DailyVisit" component={DailyVisitScreen} />

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
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
