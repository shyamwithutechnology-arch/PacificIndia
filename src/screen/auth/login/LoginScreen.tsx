import { Alert, Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  AppInput,
  CustomButton,
  Loader,
  ScreenLayout,
} from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Images } from '../../../assets/images';
import { createStyles } from './styles';
import { showToast } from '../../../utils/toast';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { localStorage, storageKeys } from '../../../storage/storage';

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    number: '',
    password: '',
  });
  console.log('error++++++++++++', errors);

  // Alert.alert('Err', errors.number);

  const [input, setInput] = useState({
    number: '',
    password: '',
  });

  // const handleLogin = () => {
  // localStorage.setItem(storageKeys.fcm_token, '1234');
  // navigation?.replace('AppDrawer');
  // };

  const handleChange = (key: string, value: any) => {
    setInput((pre) => ({ ...pre, [key]: value }));
    setErrors((pre) => ({ ...pre, [key]: '' }));
  };

  const handleLogin = async () => {
    const validatePhone = (input) => {
      const errors = {};
      const phoneErrors = [];

      if (!input?.number) {
        phoneErrors.push('Phone number is required');
      } else {
        if (input.number.length !== 10) {
          phoneErrors.push('Please enter a valid 10-digit phone number');
        }
        if (!/^\d+$/.test(input.number)) {
          phoneErrors.push('Phone number should contain only digits');
        }
      }

      if (phoneErrors.length > 0) {
        errors.number = phoneErrors.join('. ');
      }

      if (!input?.password) {
        errors.password = 'Please enter password';
      }
      return errors;
    };
    const validationErrors = validatePhone(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      // Alert.alert('response', JSON.stringify(response));
      if (response?.status === '1') {
        showToast('success', 'Success', response?.msg || 'Login successful');
        localStorage.setItem(storageKeys.fcm_token, '1234');
        localStorage.setItem(
          storageKeys.member_id,
          response?.result[0]?.member_id
        );
        navigation?.navigate('OtpRequest', {
          opt: response?.result[0]?.otp,
          phone: input.number,
        });
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
      <Loader visible={loading} />
      <AppInput
        leftIcon={Icons.callIcon}
        placeholderText={'Please enter mobile number'}
        inputBoxStyle={styles.passinput}
        leftIconStyle={styles.callIcon}
        maxLength={10}
        value={input?.number}
        handleChange={(value) => handleChange('number', value)}
      />
      {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
      <AppInput
        placeholderText={'Please enter password'}
        leftIcon={Icons.passwordicon}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.passinput}
        value={input?.password}
        handleChange={(value) => handleChange('password', value)}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

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
