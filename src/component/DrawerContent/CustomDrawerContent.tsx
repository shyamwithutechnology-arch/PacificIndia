import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconLogOut from 'react-native-vector-icons/AntDesign';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Images } from '../../assets/images';
import { createStyles } from './styles';
import { useAppTheme } from '../../hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../assets/icons';
import { localStorage, storageKeys } from '../../storage/storage';
import { POST_FORM } from '../api/request';
import { showToast } from '../../utils/toast';
import Loader from '../Common/Loader';
import { ApiEndPoint } from '../../api/endPoints';
import LogoutModal from '../logoutModal/logOutModal';
import { logout } from '../../../src/redux/Slices/authSlice';
import { useAppDispatch } from '../../redux/hooks';

const menuItems = [
  {
    title: 'Profile',
    icon: Icons.userProfileIcon,
    route: 'Profile',
  },
  { title: 'Products', icon: Icons.specialityIcon, route: 'Speciality' },

  {
    title: 'Report',
    icon: Icons.reportIcon,
    route: 'ReportList',
  },

  {
    title: 'Appointments',
    icon: Icons.appointment_icon,
    route: 'Home',
  },

  // { title: 'Daily Visit', icon: Icons.healthcareIcon, route: 'DailyVisit' },

  // { title: 'Reports', icon: 'medkit-outline', route: 'Reports' },
  {
    title: 'Notifications',
    icon: Icons.notificationIcon,
    route: 'Notification',
  },

  {
    title: 'Terms & Conditions',
    icon: Icons.termAndConditionIcon,
    route: 'Termandcondition',
  },

  {
    title: 'Privacy Policy',
    icon: Icons.privacyPolicyIcon,
    route: 'PrivacyPolicy',
  },

  {
    title: 'Support',
    icon: Icons.supportIcon,
    route: 'SupportTicket',
  },

  // { title: 'About Us', icon: 'information-circle-outline', route: 'AboutUs' },

  // {
  //   title: 'NewTicketScreen',
  //   icon: 'notifications-outline',
  //   route: 'NewTicket',
  // },
];

const nestedRoutes = {
  DailyVisit: { screen: 'DailyVisitStack', inner: 'DailyVisit' },
  Speciality: { screen: 'SpecialityStack', inner: 'Speciality' },
  Services: { screen: 'Services', inner: 'Services' },
  Bookings: { screen: 'Bookings', inner: 'Bookings' },
  Profile: { screen: 'ProfileStack', inner: 'Profile' },
  Home: { screen: 'HomeTab', inner: 'AppointMents' },
};

//
const CustomDrawerContent = ({ navigation }: any) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();

  const [userData, setuserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [logOutVisible, setLogOutVisible] = useState(false);

  const drawerStatus = useDrawerStatus();

  const handleLogOut = async () => {
    dispatch(logout());
  };

  // logout
  const handleLodOutVisible = () => {
    setLogOutVisible(true);
  };

  const handleLodOutClose = () => {
    setLogOutVisible(false);
  };

  // const handleNavigate = (item: any) => {
  //   const route = nestedRoutes[item.route];
  //   if (route) {
  //     navigation.navigate('MainTabs', {
  //       screen: route.screen,
  //       params: {
  //         screen: route.inner,
  //       },
  //     });
  //   } else {
  //     navigation.navigate(item.route);
  //   }
  // };

  const handleNavigate = (item) => {
    const route = nestedRoutes[item.route];

    if (route) {
      navigation.navigate('MainTabs', {
        screen: route.screen,
        params: {
          screen: route.inner,
        },
      });
    } else {
      navigation.navigate(item.route);
    }
  };

  const fetchUserData = async (member_id) => {
    setLoading(true);

    try {
      const params = {
        member_id: member_id,
      };
      const res = await POST_FORM(ApiEndPoint.getProfile, params);
      if (res?.status === '1') {
        setuserData(res?.result[0]);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getMemberData = async () => {
    const id = await localStorage.getItem(storageKeys.member_id);

    console.log('member id =>', id);

    if (id) {
      fetchUserData(id);
    }
  };

  useEffect(() => {
    if (drawerStatus === 'open') {
      getMemberData();
    }
  }, [drawerStatus]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={[theme.tokens.colors.primary, '#0d74b4']}
        style={styles.header}
      >
        <View style={styles.headerInnerBox}>
          <Pressable style={styles.logoBox}>
            <Image
              source={Images.logo} // change path
              style={styles.avatar}
              resizeMode="contain"
            />
          </Pressable>
          <View>
            <Text style={styles.name}>{userData?.member_name}</Text>
            <Text style={styles.role}>{userData?.member_designation_name}</Text>
          </View>
        </View>
        {/* CLOSE BUTTON */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.closeDrawer()}
        >
          <Icon name="close" size={theme.moderateScale(20)} color="#000" />
        </TouchableOpacity>
      </LinearGradient>
      <Loader visible={loading} />

      {/* MENU */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigate(item)}
          >
            <View style={styles.menuLeft}>
              {
                // <Icon
                //   name={item.icon}
                //   size={theme.moderateScale(20)}
                //   color="#1FAF9A"
                // />
              }

              <Image
                source={item?.icon}
                style={styles.drawerIcon}
                resizeMode="contain"
                tintColor={
                  item.icon !== Icons.reportIcon
                    ? theme.tokens.colors.primary
                    : undefined
                }
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logout} onPress={handleLodOutVisible}>
          <View style={styles.logoutIcon}>
            <Image
              source={Icons.logOutIcon}
              style={styles.logOutICon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoutText}>Logout My Account</Text>
        </TouchableOpacity>

        {
          // <View style={styles.helpCard}>
          //   <Icon
          //     name="headset-outline"
          //     size={theme.moderateScale(20)}
          //     color="#1FAF9A"
          //   />
          //   <Text style={styles.helpText}>
          //     Feel free to ask. We are ready to Help
          //   </Text>
          // </View>
        }
        <LogoutModal
          visible={logOutVisible}
          onClose={handleLodOutClose}
          handleLodOut={handleLogOut}
        />
      </ScrollView>

      {/* HELP CARD */}
      <View style={styles.mainBoxSupport}>
        <Image
          source={Images.apppointments1}
          style={styles.earPhone}
          resizeMode="contain"
        />
        <View style={styles.verticalLine} />
        <View>
          <Text style={styles.helpLineTest}>Support</Text>
          <Text style={styles.supportNuber}>+91 96808 25225</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
