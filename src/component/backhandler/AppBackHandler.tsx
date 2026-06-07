import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  screenName?: string;
  nestedScreen?: string;
  enabled?: boolean;
  goBack?: boolean;
};

const AppBackHandler = ({
  screenName = '',
  nestedScreen = '',
  enabled = true,
  goBack = false,
}: Props) => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const backAction = () => {
      if (goBack) {
        navigation.goBack();
      } else {
        navigation.navigate(screenName, {
          screen: nestedScreen,
        });
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, screenName, nestedScreen, enabled, goBack]);

  return null;
};

export default AppBackHandler;
