import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../theme';
import { AppTheme } from '../../../hooks/useAppTheme';

export const styles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    innerMainContainer: {
      flex: 1,
      backgroundColor: colors.black,
      borderTopLeftRadius: moderateScale(30),
      borderTopRightRadius: moderateScale(30),
      marginTop: moderateScale(-28),
    },
    innerSecondMainContainer: {
      flex: 1,
      borderTopLeftRadius: moderateScale(30),
      borderTopRightRadius: moderateScale(30),
      backgroundColor: colors.white,
      marginTop: moderateScale(20),
      paddingHorizontal: moderateScale(16),
    },

    loginText: {
      fontSize: moderateScale(20),
      color: colors.black,
      marginTop: moderateScale(40),
      fontFamily: Fonts.ManropeSemiBold,
    },
    subHeading: {
      fontSize: moderateScale(14),
      color: colors.black,
      fontFamily: Fonts.ManropeRegular,
      marginTop: moderateScale(8),
    },

    didNoteText: {
      fontSize: moderateScale(12),
      color: colors.black,
      fontFamily: Fonts.ManropeRegular,
      textAlign: 'center',
      // marginVertical: moderateScale(2)
      marginTop: moderateScale(4),
      // borderWidth:1
    },
    buttonBox: {
      marginTop: verticalScale(40),
    },
    versionText: {
      fontSize: moderateScale(14),
      color: '#454545',
      fontFamily: Fonts.ManropeRegular,
      alignSelf: 'center',
      marginTop: 'auto',
      paddingVertical: moderateScale(10),
    },
  });
};
