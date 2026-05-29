import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconLogOut from 'react-native-vector-icons/AntDesign';
import { Images } from '../../assets/images';
import { createStyles } from './styles';
import { useAppTheme } from '../../hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../assets/icons';

const menuItems = [
  { title: 'My Profile', icon: 'person-outline', route: 'Profile' },
  { title: 'My Bookings', icon: 'document-text-outline', route: 'Bookings' },
  { title: 'Services', icon: 'medkit-outline', route: 'Services' },
  { title: 'About Us', icon: 'information-circle-outline', route: 'AboutUs' },
  {
    title: 'Terms & Conditions',
    icon: 'document-text-outline',
    route: 'TermAndCondition',
  },
  {
    title: 'Privacy Policy',
    icon: 'shield-checkmark-outline',
    route: 'PrivacyPolicy',
  },
  { title: 'Help & Support', icon: 'headset-outline', route: 'HelpAndSupport' },
  {
    title: 'Notifications',
    icon: 'notifications-outline',
    route: 'Notification',
  },
  {
    title: 'SupportTicketScreen',
    icon: 'notifications-outline',
    route: 'SupportTicket',
  },
  {
    title: 'NewTicketScreen',
    icon: 'notifications-outline',
    route: 'NewTicket',
  },
];

const nestedRoutes = {
  Profile: { screen: 'ProfileStack', inner: 'Profile' },
  Services: { screen: 'Services', inner: 'Services' },
  Bookings: { screen: 'Bookings', inner: 'Bookings' },
};

//
const CustomDrawerContent = ({ navigation }: any) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const handleLogOut = () => {
    navigation.closeDrawer();
  };

  const handleNavigate = (item: any) => {
    const route = nestedRoutes[item.route];
    if (route) {
      navigation.navigate('MainTab', {
        screen: route.screen,
        params: {
          screen: route.inner,
        },
      });
    } else {
      navigation.navigate(item.route);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={[theme.tokens.colors.primary, theme.tokens.colors.black]}
        style={styles.header}
      >
        <View style={styles.headerInnerBox}>
          <Image
            source={Images.profileImg} // change path
            style={styles.avatar}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.name}>Manoj Deshmukh</Text>
            <Text style={styles.role}>User</Text>
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
      {/* MENU */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigate(item)}
          >
            <View style={styles.menuLeft}>
              <Icon
                name={item.icon}
                size={theme.moderateScale(20)}
                color="#1FAF9A"
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logout} onPress={handleLogOut}>
          <View style={styles.logoutIcon}>
            <Image
              source={Icons.logOutIcon}
              style={styles.logOutICon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoutText}>Logout My Account</Text>
        </TouchableOpacity>

        {/* HELP CARD */}
        <View style={styles.helpCard}>
          <Icon
            name="headset-outline"
            size={theme.moderateScale(20)}
            color="#1FAF9A"
          />
          <Text style={styles.helpText}>
            Feel free to ask. We are ready to Help
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;

// <View style={styles.header}>
// <Image
//   source={Images.profileImg} // change path
//   style={styles.avatar}
// />
// <View>
//   <Text style={styles.name}>Manoj Deshmukh</Text>
//   <Text style={styles.role}>User</Text>
// </View>

// {/* CLOSE BUTTON */}
// <TouchableOpacity
//   style={styles.closeBtn}
//   onPress={() => navigation.closeDrawer()}
// >
//   <Icon name="close" size={20} color="#000" />
// </TouchableOpacity>
// </View>
