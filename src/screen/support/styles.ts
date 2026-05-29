import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../theme';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  prefix: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InterMedium,
    color: colors.InputText,
  },
  dropDownStyle: {
    height: verticalScale(50),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  dropDownItem: {
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(6),
  },
  phoneInputBox: {
    height: moderateScale(52),
    borderWidth: 1,
    borderColor: colors.InputStroke,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    paddingLeft: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InterMedium,
    color: colors.InputText,
    flex: 1,
    textAlignVertical: 'top',
  },
  dropDownError: {
    fontSize: moderateScale(12),
    color: colors.red,
    fontFamily: Fonts.InterMedium,
    marginLeft: moderateScale(17),
    // marginTop: moderateScale(-14),
    // marginBottom: moderateScale(8),
  },
  dropDownBox: {
    marginBottom: moderateScale(10),
    marginTop: verticalScale(20),
  },
  commentInputBox: {
    borderWidth: 1,
    height: moderateScale(100),
    marginHorizontal: moderateScale(15.5),
    marginTop: verticalScale(5),
    paddingLeft: moderateScale(8),
    borderRadius: moderateScale(4),
    borderColor: colors.InputStroke,
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
  },
  supportBox2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  appBtn: {
    paddingHorizontal: moderateScale(30),
    width: '90%',
    marginTop: moderateScale(30),
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

  // reder list
  rowBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: scale(14),
  },
  troubleShootingBox: {
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(2),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: moderateScale(6),
    marginTop: verticalScale(8),
  },
  noInterNate: { height: verticalScale(16), aspectRatio: 1 },
  NoInternateBox: {
    height: verticalScale(30),
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    backgroundColor: colors.lightThemeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(14),
  },
  troubleShootingText: {
    fontSize: moderateScale(12),
    color: '#585858',
    fontFamily: Fonts.InstrumentSansMedium,
    width: '76%',
  },
  expireText: {
    fontSize: moderateScale(12),
    color: colors.blackSecond,
    fontFamily: Fonts.InstrumentSansMedium,
  },
  views: { height: moderateScale(16), width: moderateScale(16) },
  viewsTest: {
    fontSize: moderateScale(12),
    color: colors.gray,
    fontFamily: Fonts.InstrumentSansRegular,
  },
  lineBox: { height: 1, width: '100%', backgroundColor: '#E5E5E5' },
  commonCausesText: {
    fontSize: moderateScale(11),
    color: colors.blackSecond,
    fontFamily: Fonts.InstrumentSansRegular,
    marginLeft: scale(14),
    marginTop: verticalScale(10),
  },
  dot: {
    height: verticalScale(2.5),
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    backgroundColor: colors.blackSecond,
    marginHorizontal: scale(8),
  },
  mainDotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
    marginLeft: scale(10),
  },
  expireBox: { marginBottom: verticalScale(14) },
  wasTest: {
    fontSize: moderateScale(11),
    color: colors.black,
    fontFamily: Fonts.InstrumentSansSemiBold,
  },
  dislikeIcon: { height: moderateScale(20), width: moderateScale(20) },
  likeIcon: {
    height: moderateScale(18),
    width: moderateScale(18),
    marginRight: scale(8),
  },
  likePosition: { transform: [{ rotate: '180deg' }] },
  MainLikeDislikeBox: { flexDirection: 'row', alignItems: 'center' },
  likeDisLikeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },

  needForText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontFamily: Fonts.InstrumentSansMedium,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
});
