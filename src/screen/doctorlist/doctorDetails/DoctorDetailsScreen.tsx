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
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { ScreenLayout, AppHeader } from '../../../component';
import { Icons } from '../../../assets/icons';
import { Images } from '../../../assets/images';

const DoctorDetailsScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Doctor Details"
          search={seach}
          leftIcon={Icons.leftIcon}
        />
      }
    >
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <Image
            source={Images.doctorImg1}
            style={styles.docImg}
            borderRadius={theme.tokens.radius.xxl}
          />
          <View>
            <View>
              <Text style={styles.titleText}>Dr. Rahul Sharma</Text>
              <Text style={styles.titleDecText}>Senior Medical Officer</Text>
              <Text style={[styles.titleDecText, styles.idText]}>
                ID : DOC125689
              </Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.editBtn}>
          <Text style={styles.editText}>Edit Details</Text>
        </Pressable>
      </View>
      <View style={styles.baseLine} />

      <View style={styles.emilBox}>
        <Image
          source={Icons.emailIcon}
          resizeMode="contain"
          style={styles.emailcon}
        />
      </View>

      <Text>Rahul.sharma@pacificindia.in</Text>
    </ScreenLayout>
  );
};

export default DoctorDetailsScreen;
