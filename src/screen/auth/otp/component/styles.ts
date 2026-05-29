import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../../theme';

export const createStyles = (theme: Apptheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(12),
      marginHorizontal: moderateScale(40),
      marginVertical: moderateScale(30),
    },
    box: {
      width: moderateScale(52),
      height: moderateScale(52),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: colors.InputStroke,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },

    activeBox: {
      borderColor: colors.primary,
    },

    text: {
      fontSize: moderateScale(22),
      fontFamily: Fonts.ManropeSemiBold,
      color: colors.black,
    },

    hiddenInput: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      fontSize: 1,
      borderWidth: 1,
      borderColor: 'red',
    },
  });
};
