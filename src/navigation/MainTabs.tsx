import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import HomeStack from './stacks/HomeStack';
import { colors } from '../theme/color';
import { Icons } from '../assets/icons';
import { Fonts } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import SpecialityScreen from '../screen/speciality/SpecialityScreen';
import NotificationScreen from '../screen/notification/NotificationScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import SpecialityStack from './stacks/SpecialityStack';
import SupportScreen from '../screen/support/SupportScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, activeIcon, inactiveIcon, label }) => {
  const theme = useAppTheme();
  return (
    <View style={{ alignItems: 'center', marginTop: theme.moderateScale(10) }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        resizeMode="contain"
        style={{
          width: theme.moderateScale(25),
          height: theme.moderateScale(25),
          tintColor: focused
            ? theme.tokens.colors.primary
            : 'rgba(18, 70, 130,.9)',
          opacity: focused ? 1 : 0.5,
        }}
      />
      <Text
        style={{
          fontSize: theme.moderateScale(10),
          marginTop: theme.moderateScale(4),
          width: theme.moderateScale(50),
          color: focused ? theme.tokens.colors.primary : 'rgba(18, 70, 130,.9)',
          alignSelf: 'center',
          textAlign: 'center',
          fontFamily: focused ? Fonts.ManropeSemiBold : Fonts.ManropeMedium,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const MainTabs = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: theme.verticalScale(70), // 80
          backgroundColor: colors.white,
          paddingTop: theme.verticalScale(6),
          elevation: 10,
          overflow: 'hidden',
          // borderTopWidth: 1,
          // borderColor:"#000",
          // alignSelf:"center"
          // borderTopColor: '#E5E5E5',
        },
      }}
    >
      <Tab.Screen
        name="SpecialityStack"
        component={SpecialityStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Speciality"
              activeIcon={Icons.specialityIcon}
              inactiveIcon={Icons.specialityIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.supportIcon}
              inactiveIcon={Icons.supportIcon}
              label="Support"
            />
          ),
        }}
      />

      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.homeIcon}
              inactiveIcon={Icons.homeIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.footerNotificationIcon}
              inactiveIcon={Icons.footerNotificationIcon}
              label="Notification"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.userProfileIcon}
              inactiveIcon={Icons.userProfileIcon}
              label="Profile"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainTabs;
