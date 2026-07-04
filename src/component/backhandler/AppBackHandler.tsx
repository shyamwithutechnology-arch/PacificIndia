// import { useEffect } from 'react';
// import { BackHandler } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// type Props = {
//   screenName?: string;
//   nestedScreen?: string;
//   enabled?: boolean;
//   goBack?: boolean;
// };

// const AppBackHandler = ({
//   screenName = '',
//   nestedScreen = '',
//   enabled = true,
//   goBack = false,
// }: Props) => {
//   const navigation = useNavigation<any>();

//   useEffect(() => {
//     if (!enabled) {
//       return;
//     }

//     const backAction = () => {
//       if (goBack) {
//         navigation.goBack();
//       } else {
//         navigation.navigate(screenName, {
//           screen: nestedScreen,
//         });
//       }

//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction
//     );

//     return () => backHandler.remove();
//   }, [navigation, screenName, nestedScreen, enabled, goBack]);

//   return null;
// };

// export default AppBackHandler;

import { BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

const AppBackHandler = ({
  screenName = '',
  nestedScreen = '',
  enabled = true,
  goBack = false,
  onBackPress,
}) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!enabled) {
        return;
      }

      const backAction = () => {
        console.log('Hardware Back Pressed');
        if (onBackPress) {
          onBackPress();
          return true;
        }

        if (goBack) {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        } else {
          navigation.navigate(screenName, {
            screen: nestedScreen,
          });
        }

        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => subscription.remove();
    }, [navigation, screenName, nestedScreen, enabled, goBack, onBackPress])
  );

  return null;
};

export default AppBackHandler;
