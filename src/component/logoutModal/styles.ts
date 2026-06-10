import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, moderateScale, scale } = theme;
  return StyleSheet.create({
    noTexBtn: {
      paddingHorizontal: moderateScale(28),
      paddingVertical: moderateScale(5.5),
      // borderWidth: 0.5,
      borderRadius: moderateScale(4),
      borderColor: tokens.colors.primary,
    },
    noText: {
      fontSize: moderateScale(14.5),
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeMedium,
    },
    btnMainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
      marginTop: moderateScale(30),
    },
    areYouText: {
      fontSize: moderateScale(15.8),
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeRegular,
      marginLeft: moderateScale(10),
    },
    // modal
    modalContainer: {
      padding: moderateScale(8),
      // borderRadius: moderateScale(1),
      // borderTopLeftRadius: moderateScale(1),
      // borderTopRightRadius: moderateScale(1),
    },
    overlayStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
    },
  });
};
