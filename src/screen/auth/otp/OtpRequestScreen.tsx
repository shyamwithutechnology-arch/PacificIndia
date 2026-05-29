// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { styles } from './styles';
// import { OtpInput, OtpTimer } from '../../auth/otp/component';
// import { useRoute } from '@react-navigation/native';
// import { showToast } from '../../../utils/toast';
// import { ApiEndPoint } from '../../../api/endPoints';
// import { POST_FORM } from '../../../api/request';
// import DeviceInfo from 'react-native-device-info';
// import { reduxStorage } from '../../../storage/storage';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../../redux/slices/authSlice';

// const OtpRequestScreen = ({ navigation }) => {
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const version = DeviceInfo.getVersion();
//   const { phoneNumber, otpResult, user_exist } = route.params;
//   const otpRef = useRef<any>(null);
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentOtpResult, setCurrentOtpResult] = useState(otpResult);

//   const maskPhoneNumber = (phone) => {
//     if (!phone) return '';
//     const phoneStr = phone.toString();
//     const last3 = phoneStr?.slice(-3);
//     return `+91-*******${last3}`;
//   };

//   const handleOtp = async () => {
//     let otpResultToString = currentOtpResult.toString();
//     if (otp?.trim() === '') {
//       showToast('error', 'Error', 'Please fill the OTP');
//     } else if (otp?.trim() !== otpResultToString) {
//       showToast('error', 'Error', 'OTP does not match');
//     } else if (otp.trim() === otpResultToString.trim() && user_exist === 1) {
//       // showToast('success', 'Success', 'OTP Verified Successfully');
//       await reduxStorage.setItem('token', '1234');
//       await dispatch(loginSuccess('1234'));
//       showToast('success', 'Success', 'Logged in successfully');
//     } else if (otp.trim() === otpResultToString.trim()) {
//       navigation.navigate('LoginScreenRole', { phoneNumber: phoneNumber });
//       showToast('success', 'Success', 'OTP Verified Successfully');
//     }
//   };

//   const handleResendOtp = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         usr_phone: phoneNumber,
//       };
//       const response = await POST_FORM(ApiEndPoint?.LoGIN, params);
//       console.log('ressssssssqqwwww', response);

//       if (response.status === 200) {
//         const newOtp = String(response?.result);
//         setCurrentOtpResult(newOtp);
//         setOtp('');
//         showToast('success', 'Success', 'OTP resent successfully');
//         // Alert.alert('New OTP Sent', `Your new OTP is: ${newOtp}`, [
//         //   {
//         //     text: 'Auto-fill',
//         //     onPress: () => setOtp(newOtp), // Auto-fill OTP
//         //     style: 'default',
//         //   },
//         //   {
//         //     text: 'OK',
//         //     style: 'cancel',
//         //   },
//         // ]);
//       } else {
//         showToast('error', 'Error', response.msg || 'OTP faild');
//       }
//     } catch (error) {
//       if (error?.offline) {
//         return;
//       }
//       showToast('error', 'Error', error.msg || 'dddSomething went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useFocusEffect(
//   //   React.useCallback(() => {
//   //     if (currentOtpResult && currentOtpResult !== '') {
//   //       const timer = setTimeout(() => {
//   //         Alert.alert('OTP', `Your OTP is: ${currentOtpResult}`);
//   //       }, 300);

//   //       return () => clearTimeout(timer);
//   //     }
//   //   }, [currentOtpResult])
//   // );

//   return (
//     <SafeAreaView
//       style={styles.mainContainer}
//       edges={['left', 'right', 'bottom']}
//     >
//       <AppHeader
//         title="Paper Fast"
//         discriptionText="Paper Generate In Minute"
//         headerStyle={{ marginBottom: moderateScale(8.2) }}
//       />
//       <View style={styles.innerMainContainer}>
//         <View style={styles.innerSecondMainContainer}>
//           <Text style={styles.loginText}>OTP Request</Text>
//           <Text style={styles.subHeading}>
//             We’ll sent an OTP to your {maskPhoneNumber(phoneNumber)} number.
//           </Text>
//           <TouchableWithoutFeedback
//             onPress={() => {
//               Keyboard.dismiss();
//               otpRef.current?.blur(); //cursor removed
//             }}
//           >
//             <View style={{ flex: 1 }}>
//               <OtpInput ref={otpRef} value={otp} onChange={setOtp} />
//               <Text style={styles.didNoteText}>Didn’t receive code?</Text>
//               <Text style={styles.didNoteText}>You can resend code in</Text>

//               <OtpTimer onResendOtp={handleResendOtp} isLoading={loading} />

//               <View style={styles.buttonBox}>
//                 <AppButton
//                   title="Verification"
//                   onPress={handleOtp}
//                   style={{ paddingHorizontal: moderateScale(123) }}
//                 />
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//           <Text style={styles.versionText}>Version {version}</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default OtpRequestScreen;

import { View, Text } from 'react-native';
import React from 'react';

const OtpRequestScreen = () => {
  return (
    <View>
      <Text>OtpRequestScreen</Text>
    </View>
  );
};

export default OtpRequestScreen;
