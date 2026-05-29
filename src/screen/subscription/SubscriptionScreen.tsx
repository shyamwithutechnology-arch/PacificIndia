// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   StatusBar,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { colors, Fonts } from '../../theme';
// import { moderateScale } from '../../utils/responsiveSize';
// import { Icons } from '../../assets/icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AppHeader from '../../component/header/AppHeader';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';

// const SubscriptionScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <AppHeader/> */}
//       <StatusBar
//         barStyle={'dark-content'}
//         backgroundColor={colors.lightThemeBlue}
//       />

//       {/* <SafeAreaView style={{ backgroundColor: colors.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule title='Draft Papers' />
//             </SafeAreaView> */}
//       <View style={styles.content}>
//         {/* Icon */}
//         {/* <View style={styles.iconContainer}>
//           <Image
//             source={Icons.clockIcon}
//             style={styles.icon}
//             resizeMode="contain"
//           />
//         </View> */}

//         {/* Title */}
//         <Text style={styles.title}>Coming Soon!</Text>

//         {/* Message */}
//         <Text style={styles.message}>
//           This feature is currently under development.{'\n'}
//           We're working hard to bring it to you soon.
//         </Text>

//         {/* Back Button */}
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backButtonText}>Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(24),
//   },
//   iconContainer: {
//     width: moderateScale(120),
//     height: moderateScale(120),
//     borderRadius: moderateScale(60),
//     backgroundColor: colors.lightThemeBlue + '20', // 20 = 12% opacity
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: moderateScale(32),
//   },
//   icon: {
//     width: moderateScale(60),
//     height: moderateScale(60),
//     tintColor: colors.primaryColor,
//   },
//   title: {
//     fontSize: moderateScale(25),
//     fontFamily: Fonts.InterBold,
//     color: colors.black,
//     textAlign: 'center',
//     marginBottom: moderateScale(16),
//   },
//   message: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InterRegular,
//     color: colors.ParagraphAndShortTexts,
//     textAlign: 'center',
//     lineHeight: moderateScale(24),
//     marginBottom: moderateScale(40),
//   },
//   backButton: {
//     backgroundColor: colors.primaryColor,
//     paddingHorizontal: moderateScale(25),
//     paddingVertical: moderateScale(10),
//     borderRadius: moderateScale(8),
//   },
//   backButtonText: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: colors.white,
//   },
// });

// export default SubscriptionScreen;
import { View, Text } from 'react-native';
import React from 'react';

const SubscriptionScreen = () => {
  return (
    <View>
      <Text>SubscriptionScreen</Text>
    </View>
  );
};

export default SubscriptionScreen;
