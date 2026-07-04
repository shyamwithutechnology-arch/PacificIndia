import { Image, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './styles';
import { CustomButton } from '../../../component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OTPInput from '../../../component/OTPInput/OTPInput';
import { ScreenLayout } from '../../../component';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Images } from '../../../assets/images';
import { Icons } from '../../../assets/icons';
import { localStorage, storageKeys } from '../../../storage/storage';
import { useRoute } from '@react-navigation/native';
// import { loginSuccess } from 'src/redux/slices/authSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { loginSuccess } from '../../../../src/redux/Slices/authSlice';

const OtpRequestScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const route = useRoute();
  const { opt, phone } = route?.params || {};

  const handleOtpVerified = () => {
    // localStorage.setItem(storageKeys.fcm_token, '1234');
    // navigation.getParent().replace('AppDrawer');
    const fakeToken = 'static-token-123456';
    dispatch(loginSuccess(fakeToken));
    // Alert.alert('success');
    // navigation.navigate('MainTab');
  };

  return (
    <ScreenLayout
      paddingHorizontalStyle={0}
      innerContainer={{
        paddingBottom: insets.bottom + theme.tokens.spacing.lg,
      }}
    >
      <View style={styles.logoBox}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      </View>

      <LinearGradient
        colors={[theme.tokens.colors.white, theme.tokens.colors.lightPrimary]}
        style={styles.innerContainer}
      >
        <View>
          <Text style={styles.loginText}>OTP Request</Text>

          <Text style={[styles.loginText, styles.decText]}>
            Login to accesss healthcare services
          </Text>
          <OTPInput />
          <Text style={styles.optSendText}>OTP sent to +91 {phone}</Text>

          <CustomButton
            title="Verify & Login"
            style={{ width: '90%' }}
            onPress={handleOtpVerified}
          />

          <Text style={styles.changeText}>Change Number</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.mainBoxSupport}>
            <View style={styles.earPhoneBox}>
              <Image
                source={Images.apppointments1}
                style={styles.earPhone}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.helpLineTest}>Helpline Support</Text>
              <Text style={styles.supportNuber}>+91 8709952350</Text>
            </View>
          </View>
          <Text style={styles.versionText}>Version:1.0</Text>
        </View>
      </LinearGradient>
    </ScreenLayout>
  );
};

export default OtpRequestScreen;
