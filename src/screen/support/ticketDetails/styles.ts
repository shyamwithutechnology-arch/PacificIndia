import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../theme';
import { moderateScale, verticalScale } from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  HomeCotainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  invoiceBox: {
    padding: verticalScale(16),
    borderWidth: 1,
    borderColor: colors.InputStroke,
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(10),
    backgroundColor: '#F2F2F2',
    marginTop: moderateScale(20),
  },
  invoiceText: {
    fontSize: moderateScale(14),
    color: colors.InputText,
    fontFamily: Fonts.InstrumentSansMedium,
  },

  supportText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: moderateScale(14),
    color: '#969696',
  },
  supportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(14),
    // backgroundColor: colors.lightThemeBlue
  },
  numberTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maskGroupImag: {
    width: moderateScale(60),
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  mainMaskView: {
    backgroundColor: 'rgba(12, 64, 111, 0.07)',
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(30),
    marginTop: 'auto',
  },
  plusImg: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'contain',
    marginLeft: moderateScale(-6),
  },
  supportNumberText: {
    fontSize: moderateScale(22),
    color: '#3B3B3B',
    fontFamily: Fonts.InterSemiBold,
    // alignSelf: 'flex-start'
  },
  scrachLine: {
    width: moderateScale(1),
    height: moderateScale(35),
    backgroundColor: 'rgba(12, 64, 111, 0.24)',
    marginVertical: moderateScale(10),
  },
});
