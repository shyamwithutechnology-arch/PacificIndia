import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Keyboard, Text, View } from 'react-native';
import HomeStack from './stacks/HomeStack';
import { colors } from '../theme/color';
import { Icons } from '../assets/icons';
import { Fonts } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import SpecialityScreen from '../screen/speciality/SpecialityScreen';
import NotificationScreen from '../screen/notification/NotificationScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import SpecialityStack from './stacks/SpecialityStack';
import SupportScreen from '../screen/support/SupportTicketScreen';
import DailyVisitScreen from '../screen/dailyVisit/DailyVisitScreen';
import DoctorDetailsScreen from '../screen/doctorlist/doctorDetails/DoctorDetailsScreen';
import DoctorlistScreen from '../screen/doctorlist/DoctorlistScreen';
import DoctorsStack from './stacks/DoctorsStack';
import DailyVisitStack from './stacks/DailyVisitStack';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, activeIcon, inactiveIcon, label, tint = true }) => {
  const theme = useAppTheme();
  return (
    <View style={{ alignItems: 'center', marginTop: theme.moderateScale(10) }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        resizeMode="contain"
        style={{
          width: tint ? theme.moderateScale(25) : theme.moderateScale(50),
          height: tint ? theme.moderateScale(25) : theme.moderateScale(50),
          marginTop: !tint && theme.tokens.spacing.mdPlus,
          tintColor: tint
            ? focused
              ? theme.tokens.colors.primary
              : 'rgba(18, 70, 130,.9)'
            : undefined,

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

  //keyboard disable
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );

    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
          display: keyboardVisible ? 'none' : 'flex',
        },
      }}
    >
      <Tab.Screen
        name="SpecialityStack"
        component={SpecialityStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent the default action
            e.preventDefault();

            // Reset the SpecialityStack to only contain the first screen
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'SpecialityStack',
                  state: {
                    routes: [{ name: 'Speciality' }],
                  },
                },
              ],
            });
          },
        })}
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
        name="DailyVisitStack"
        component={DailyVisitStack}
        options={{
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.healthcareIcon}
              inactiveIcon={Icons.healthcareIcon}
              label="Visit"
            />
          ),
        }}
      />

      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.homeIcon}
              inactiveIcon={Icons.homeIcon}
              tint={false} // important
            />
          ),
        }}
      />
      <Tab.Screen
        name="Doctorlist"
        component={DoctorsStack}
        options={{
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon={Icons.doctorListIcon}
              inactiveIcon={Icons.doctorListIcon}
              label="Doctor"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          popToTopOnBlur: true,
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
