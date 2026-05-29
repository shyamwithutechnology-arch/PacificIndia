import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const menuItems = [
  { title: 'My Profile', icon: 'person-outline' },
  { title: 'My Bookings', icon: 'document-text-outline' },
  { title: 'Services', icon: 'medkit-outline' },
  { title: 'About Us', icon: 'information-circle-outline' },
  { title: 'Terms & Conditions', icon: 'document-outline' },
  { title: 'Privacy Policy', icon: 'shield-checkmark-outline' },
  { title: 'Help & Support', icon: 'headset-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
];

const CustomDrawerContent = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/profile.png')} // change path
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Manoj Deshmukh</Text>
          <Text style={styles.role}>User</Text>
        </View>

        {/* CLOSE BUTTON */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.closeDrawer()}
        >
          <Icon name="close" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MENU */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={20} color="#1FAF9A" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logout}>
          <View style={styles.logoutIcon}>
            <Icon name="log-out-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.logoutText}>Logout My Account</Text>
        </TouchableOpacity>

        {/* HELP CARD */}
        <View style={styles.helpCard}>
          <Icon name="headset-outline" size={20} color="#1FAF9A" />
          <Text style={styles.helpText}>
            Feel free to ask. We are ready to Help
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;
