import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    pressable: {
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    pressed: {
      opacity: 0.8,
    },

    disabled: {
      opacity: 0.5,
    },
    button: {
      backgroundColor: '#14b8a6',
      width: '100%',
      paddingVertical: verticalScale(10),
      borderRadius: scale(13),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      color: tokens.colors.white,
      fontSize: tokens.fontSize.mdPlus,
      fontFamily: Fonts.ManropeSemiBold,
      textAlignVertical: 'center',
      textAlign: 'center',
    },

    rightIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
      marginLeft: tokens.spacing.xxs,
    },
  });
};
