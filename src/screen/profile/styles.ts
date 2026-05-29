import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../theme';
import { moderateScale, verticalScale } from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerMainContainer: {
    flex: 1,
    backgroundColor: colors.frameBgColor,
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
  },

  loginText: {
    fontSize: moderateScale(20),
    color: colors.black,
    marginTop: moderateScale(10),
    fontFamily: Fonts.InstrumentSansSemiBold,
    marginLeft: moderateScale(20),
  },
  subHeading: {
    fontSize: moderateScale(14),
    color: colors.ParagraphAndShortTexts,
    fontFamily: Fonts.InterRegular,
    marginLeft: moderateScale(20),
    marginTop: moderateScale(4),
    marginBottom: moderateScale(16),
  },
  byRegisterText: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.InterRegular,
    color: colors.ParagraphAndShortTexts,
    textAlign: 'center',
    marginTop: moderateScale(20),
  },

  // phoneInput static
  phoneInput: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InterMedium,
    color: colors.InputText,
    flex: 1,
    textAlignVertical: 'center',
  },

  prefix: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InterMedium,
    color: colors.InputText,
    // marginLeft: moderateScale(10)
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
    marginVertical: moderateScale(14),
  },
  countryImgStyle: {
    width: moderateScale(30),
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  maskGroupImag: {
    width: moderateScale(60),
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  privacyBox: {
    marginTop: moderateScale(18),
  },
  scrachLine: {
    width: moderateScale(1),
    height: moderateScale(35),
    backgroundColor: 'rgba(12, 64, 111, 0.24)',
    marginVertical: moderateScale(10),
  },
  supportText: {
    fontSize: moderateScale(14),
    color: '#969696',
    fontFamily: Fonts.InstrumentSansSemiBold,
    alignSelf: 'flex-start',
  },
  supportNumberText: {
    fontSize: moderateScale(22),
    color: '#3B3B3B',
    fontFamily: Fonts.InterSemiBold,
    // alignSelf: 'flex-start'
  },
  plusImg: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'contain',
    marginLeft: moderateScale(-6),
  },
  mainMaskView: {
    backgroundColor: 'rgba(12, 64, 111, 0.07)',
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: moderateScale(50),
    marginTop: 'auto',
  },
  havingText: {
    color: colors.ParagraphAndShortTexts,
    fontFamily: Fonts.InterRegular,
  },
  supportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(14),
  },
  numberTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionText: {
    fontSize: moderateScale(14),
    color: '#454545',
    fontFamily: Fonts.InterRegular,
    alignSelf: 'center',
    marginTop: 'auto',
  },
  selectRoleText: {
    fontSize: moderateScale(15.5),
    fontFamily: Fonts.InstrumentSansMedium,
    color: colors.black,
    marginLeft: moderateScale(16),
    marginTop: moderateScale(5),
  },
  redioBtn: {
    height: moderateScale(13),
    width: moderateScale(13),
    borderWidth: 1,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerBox: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderWidth: 1,
    borderRadius: moderateScale(20),
    backgroundColor: colors.primaryColor,
  },
  teacherText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontFamily: Fonts.InterRegular,
    marginLeft: moderateScale(10),
  },
  teacherBox: {
    borderWidth: 1,
  },
  mainRoleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  forText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.InterSemiBold,
    color: colors.black,
    marginLeft: moderateScale(20),
    marginTop: moderateScale(5),
  },
  selectionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(15),
    marginBottom: moderateScale(22),
  },
  studentText: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(14),
    color: colors.InputText,
  },
  studentBox: {
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: "center",
    // borderWidth: 1
  },
  studentImgBox: {
    borderWidth: 0.1,
    borderRadius: moderateScale(60),
    borderColor: colors.InputStroke,
    height: moderateScale(60),
    width: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },

  maleImg: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
    // marginLeft: moderateScale(20)
  },
  datePickerBox: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(11.5),
    borderWidth: 1,
    marginHorizontal: moderateScale(17),
    borderRadius: moderateScale(8),
    borderColor: colors.InputStroke,
    marginTop: moderateScale(0),
  },
  phoneBox: {
    marginVertical: moderateScale(13),
    // marginTop: moderateScale(-50),
  },
  dateText: {
    fontSize: moderateScale(14),
    color: colors.InputText,
    fontFamily: Fonts.InterRegular,
  },
  rightIconStyles: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: 'red',
  },
  // switch loader
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    paddingHorizontal: moderateScale(20),
  },

  loaderIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
  },

  loadingTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.InstrumentSansBold,
    color: colors.primaryColor,
    marginTop: verticalScale(20),
    textAlign: 'center',
  },

  loadingSubTitle: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.InstrumentSansMedium,
    color: '#1B163F',
    textAlign: 'center',
    marginTop: moderateScale(12),
    lineHeight: moderateScale(28),
  },
});
