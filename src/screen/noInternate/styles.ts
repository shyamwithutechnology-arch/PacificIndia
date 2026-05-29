import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../theme';
import { moderateScale } from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  iconContainer: {
    marginBottom: moderateScale(24),
    // borderWidth: 1,
  },
  icon: {
    // fontSize: moderateScale(35),
    // color: colors.lightThemeBlue,
    height: moderateScale(70),
    width: moderateScale(70),
  },
  title: {
    fontSize: moderateScale(17),
    marginBottom: moderateScale(12),
    fontFamily: Fonts.InstrumentSansBold,
    color: '#333',
    // fontFamily:
  },
  message: {
    fontSize: moderateScale(15),
    color: '#666',
    textAlign: 'center',
    marginBottom: moderateScale(26),
    lineHeight: moderateScale(24),
  },
  retryButton: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: moderateScale(32),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    minWidth: moderateScale(190),
    alignItems: 'center',
  },
  retryButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: Fonts.InstrumentSansSemiBold,
  },
});
