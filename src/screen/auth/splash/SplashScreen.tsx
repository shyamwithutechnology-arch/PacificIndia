import React, { useEffect } from 'react';
import { Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../../assets/images';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { createStyles } from './styles';
import { useAuthBootstrap } from '../../../hooks/useAuthBootstrap';
import { localStorage } from '../../../storage/storage';

const SplashScreen = ({ navigation }: any) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const fcmToken = localStorage.getItem('fcm_token');
  // const appState = useAuthBootstrap();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fcmToken) {
        navigation?.replace('AuthStack');
      } else {
        navigation?.replace('MainTab');
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [fcmToken, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Images.profileImg} style={styles.splashBgStyle}>
        <Image
          source={Images.profileImg}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

// import { Image, ImageBackground, Text, View } from 'react-native';
// import React from 'react';
// import { createStyles, styles } from './styles';
// import { Images } from '../../../assets/images';
// import { useAppTheme } from '../../../hooks/useAppTheme';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const SplashScreen = () => {
//   const theme = useAppTheme();
//   const styles = createStyles(theme);
//   const { tokens, scale, verticalScale, moderateScale, insets } = theme;
//   return (
//     <SafeAreaView edges={['top']} style={styles.container}>
//       <ImageBackground source={Images.splashBgImg} style={styles.splashBgStyle}>
//         <Image
//           source={Images.splashLogo}
//           style={styles.splashLogo}
//           resizeMode="contain"
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default SplashScreen;
