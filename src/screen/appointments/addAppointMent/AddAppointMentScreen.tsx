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
import { useAppTheme } from '../../../hooks/useAppTheme';
import { createStyles } from './styles';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomButton,
} from './../../../component';
import { Icons } from '../../../assets/icons';

const AddAppointMentScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  const [input, setInput] = useState({
    name: '',
    mobile: '',
    email: '',
    hospitalName: '',
    hospitalAddress: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    email: '',
    hospitalName: '',
    hospitalAddress: '',
    comment: '',
  });

  const handleChange = (key: string, value: any) => {
    setInput((pre) => ({ ...pre, [key]: value }));
    setErrors((pre) => ({ ...pre, [key]: '' }));
  };

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Add appointment"
          search={seach}
          leftIcon={Icons.drawerIcon}
          onPress={() => navigation.openDrawer()}
        />
      }
    >
      <Text style={styles.doctorName}>Doctor Name</Text>
      <AppInput
        inputBoxStyle={styles.inputBoxStyle}
        placeholderText="Please enter name"
        value={input.name}
        handleChange={(value) => handleChange('name', value)}
      />

      <Text style={styles.doctorName}>Doctor Name</Text>
      <AppInput
        inputBoxStyle={styles.inputBoxStyle}
        placeholderText="Please enter doctor mobile number"
        value={input.mobile}
        handleChange={(value) => handleChange('mobile', value)}
      />

      <Text style={styles.doctorName}>Doctor Email</Text>
      <AppInput
        inputBoxStyle={styles.inputBoxStyle}
        placeholderText="Please enter email"
        value={input.email}
        handleChange={(value) => handleChange('email', value)}
      />

      <Text style={styles.doctorName}>Hospital Name</Text>
      <AppInput
        inputBoxStyle={styles.inputBoxStyle}
        placeholderText="Please enter hospital name"
        value={input.hospitalName}
        handleChange={(value) => handleChange('hospitalName', value)}
      />

      <Text style={styles.doctorName}>Hospital address</Text>
      <AppInput
        inputBoxStyle={styles.inputBoxStyle}
        placeholderText="Please enter hospital address"
        value={input.hospitalAddress}
        handleChange={(value) => handleChange('hospitalAddress', value)}
      />

      <CustomButton title="Submit" />
    </ScreenLayout>
  );
};

export default AddAppointMentScreen;
