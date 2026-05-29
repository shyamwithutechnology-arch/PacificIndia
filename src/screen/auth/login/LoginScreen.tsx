import { Image, Text, View } from 'react-native';
import React from 'react';
import { AppInput, CustomButton, ScreenLayout } from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Images } from '../../../assets/images';
import { createStyles } from './styles';
import { localStorage, storageKeys } from '../../../storage/storage';
import { STORAGE_KEYS } from '../../../storage/keys';

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  // const handleLogin = () => {
  //   localStorage.setItem(storageKeys.fcm_token, '1234');
  //   navigation?.replace('AppDrawer');
  // };
  const handleLogin = () => {
    localStorage.setItem(storageKeys.fcm_token, '1234');

    navigation.getParent()?.replace('AppDrawer');
  };
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
      />

      <AppInput
        placeholderText={'Please enter password'}
        leftIcon={Icons.passwordicon}
        leftIconStyle={styles.passIcon}
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
