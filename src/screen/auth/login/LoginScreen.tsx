import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { AppInput, CustomButton, ScreenLayout } from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Images } from '../../../assets/images';
import { createStyles } from './styles';
import { showToast } from '../../../utils/toast';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    number: '',
    password: '',
  });
  const [input, setInput] = useState({
    number: '',
    password: '',
  });
  // const handleLogin = () => {
  //   localStorage.setItem(storageKeys.fcm_token, '1234');
  //   navigation?.replace('AppDrawer');
  // };
  const handleChange = (key: string, value: any) => {
    setInput((pre) => ({ ...pre, [key]: value }));
    setErrors((pre) => ({ ...pre, [key]: '' }));
  };

  const handleLogin = async () => {
    setErrors({});
    const validatePhone = (input) => {
      const errors = {};
      if (!input.number) {
        errors.number = 'Phone number is required';
      } else if (input?.number.length !== 10) {
        errors.number = 'Please enter a valid 10-digit phone number';
      } else if (!/^\d{10}$/.test(input?.number)) {
        errors.number = 'Phone number should contain only digits';
      }

      if (input?.password) {
        errors.password = 'Please enter password';
      }
      return errors;
    };

    const validationErrors = validatePhone(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // showToast('error', 'Error', 'Please check your phone number')
      return;
    }
    setErrors({});
    try {
      const params = {
        member_phone: input.number,
        member_password: input?.password,
        device_token: '234567890',
      };

      setLoading(true);
      const response = await POST_FORM(ApiEndPoint?.LoGIN, params);
      if (response?.status === 200) {
        console.log('ressssssssss', response);
      } else {
        showToast('error', 'Error', response.msg || 'OTP faild');
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
  // const handleLogin = () => {
  //   navigation.navigate('OtpRequest');
  // };

  return (
    <ScreenLayout>
      <View style={styles.logoBox}>
        <Image source={Images.logo} style={styles.logo} />
      </View>

      <AppInput
        leftIcon={Icons.callIcon}
        placeholderText={'Please enter mobile number'}
        inputBoxStyle={styles.passinput}
        leftIconStyle={styles.callIcon}
        maxLength={10}
        value={input?.number}
        handleChange={(value) => handleChange('number', value)}
      />

      <AppInput
        placeholderText={'Please enter password'}
        leftIcon={Icons.passwordicon}
        leftIconStyle={styles.passIcon}
        value={input?.password}
        handleChange={(value) => handleChange('password', value)}
      />

      <CustomButton
        title="Login"
        style={styles.loginBtn}
        onPress={handleLogin}
      />
      <Text style={styles.versionText}>Version 1.0</Text>
    </ScreenLayout>
  );
};

export default LoginScreen;
