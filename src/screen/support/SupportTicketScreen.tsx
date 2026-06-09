import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomButton,
} from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import { SearchList } from '../../component/searchList/SearchList';
import { createStyles } from './styles';
import { Images } from '../../assets/images';
import UserIcon from 'react-native-vector-icons/FontAwesome6';

const SupportTicketScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  return (
    <ScreenLayout
      header={<AppHeader title="Support" leftIcon={Icons.leftIcon} />}
      innerContainer={styles.innerContainer}
      scroll={true}
    >
      <View style={styles.customerCareBox}>
        <View style={styles.logoHederRow}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.pacificText}>Pacific India</Text>
            <Text style={styles.customerText}>Customer Care</Text>
          </View>
        </View>
        <Pressable style={styles.callIcon}>
          <Image source={Images.apppointments1} style={styles.callIcon} />
        </Pressable>
      </View>

      <View style={styles.headerBox}>
        <View style={styles.nameRow}>
          <Image
            source={Icons.namecon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>Name</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.callFillIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>+91-9393495969</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.emailIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>Support@thepacificindia.com</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.mapFillIcon}
            style={styles.nameIcon}
            resizeMode="contain"
            tintColor={theme.tokens.colors.primary}
          />
          <Text style={styles.nameText}>
            3rd Floor, Pacific Medi Tower, 4A, Nand Vihar
          </Text>
        </View>
      </View>

      <View style={styles.headerBox}>
        <Text style={styles.haveAnyText}>Have any query?</Text>
        <View style={styles.nameRow}>
          <UserIcon
            name="user-large"
            color={theme.tokens.colors.primary}
            size={theme.moderateScale(18)}
          />
          <Text style={styles.nameText}>Name</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.callFillIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>+91-9393495969</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.emailIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>Support@thepacificindia.com</Text>
        </View>
        <View style={styles.baseLine} />
        <AppInput placeholderText={'Write here...'} />

        <CustomButton title="Submit" style={styles.submitBtn} />
      </View>
    </ScreenLayout>
  );
};

export default SupportTicketScreen;
