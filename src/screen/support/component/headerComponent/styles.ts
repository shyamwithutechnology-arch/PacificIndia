import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../../theme';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  inputMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(18),
  },

  textInputBox: {
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: 'rgba(18, 148, 137, 0.19)',
    width: '86%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(2),
    paddingLeft: scale(16),
    paddingRight: scale(14),
    backgroundColor: colors.white,
    elevation: 5,

    // IOS Shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  inputBox: {
    fontSize: moderateScale(14),
    color: '#7B8084',
    fontFamily: Fonts.InstrumentSansSemiBold,
    width: '80%',
  },

  searchBox: {
    height: verticalScale(30),
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterIconBox: {
    height: verticalScale(34),
    aspectRatio: 1,
    borderRadius: moderateScale(2),
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popularArticle: {
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: Fonts.InstrumentSansSemiBold,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(18),
  },

  troubleShootingBox: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(6),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },

  noInterNate: {
    height: verticalScale(23),
    aspectRatio: 1,
  },

  NoInternateBox: {
    height: verticalScale(40),
    aspectRatio: 1,
    borderRadius: moderateScale(50),
    backgroundColor: 'rgba(19, 186, 172, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(10),
  },

  troubleShootingText: {
    fontSize: moderateScale(14),
    color: '#1A1A1A',
    fontFamily: Fonts.InstrumentSansMedium,
  },

  expireText: {
    fontSize: moderateScale(11),
    color: '#7B8084',
    fontFamily: Fonts.InstrumentSansMedium,
  },

  views: {
    height: moderateScale(16),
    width: moderateScale(16),
  },

  viewsTest: {
    fontSize: moderateScale(12),
    color: '#A0A0A0',
    fontFamily: Fonts.InstrumentSansRegular,
  },

  lineBox: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E5E5',
  },

  commonCausesText: {
    fontSize: moderateScale(11),
    color: '#7B8084',
    fontFamily: Fonts.InstrumentSansRegular,
    marginLeft: scale(14),
    marginTop: verticalScale(10),
  },

  dot: {
    height: verticalScale(2.5),
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    backgroundColor: '#7B8084',
    marginHorizontal: scale(8),
  },

  mainDotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
    marginLeft: scale(18),
  },

  expireBox: {
    marginBottom: verticalScale(14),
  },

  wasTest: {
    fontSize: moderateScale(11),
    color: colors.black,
    fontFamily: Fonts.InstrumentSansSemiBold,
  },

  dislikeIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },

  likeIcon: {
    height: moderateScale(18),
    width: moderateScale(18),
    marginRight: scale(8),
  },

  likePosition: {
    transform: [{ rotate: '180deg' }],
  },

  MainLikeDislikeBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  likeDisLikeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
});

// import { StyleSheet } from 'react-native';
// import {
//   moderateScale,
//   scale,
//   verticalScale,
// } from '../../../../utils/responsiveSize';
// import { Fonts } from '../../../../theme';

// export const styles = StyleSheet.create({
//   inputMainBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: verticalScale(18),
//   },
//   textInputBox: {
//     height: verticalScale(40),
//     borderWidth: 1,
//     borderColor: 'rgba(18, 148, 137, 0.19)',
//     width: '86%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderRadius: moderateScale(2),
//     paddingLeft: scale(16),
//     backgroundColor: '#fff', // required
//     paddingRight: scale(14),
//     elevation: 5,

//     // ios
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 }, // 👈 increase height
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   inputBox: {
//     fontSize: moderateScale(14),
//     color: '#7B8084',
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     width: '80%',
//   },
//   searchBox: {
//     height: verticalScale(30),
//     aspectRatio: 1,
//     borderRadius: moderateScale(20),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   filterIconBox: {
//     height: verticalScale(34),
//     aspectRatio: 1,
//     borderRadius: moderateScale(2),
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   popularArticle: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: '#000',
//     marginBottom: verticalScale(18),
//     marginTop: verticalScale(12),
//   },
//   troubleShootingBox: {
//     paddingVertical: tokens.spacing.xs,
//     paddingHorizontal: tokens.spacing.xxs,
//     borderColor: '#E5E5E5',
//     borderRadius: tokens.spacing.smPlus,
//     marginBottom: tokens.spacing.smPlus,
//     borderWidth: 1,
//   },
//   noInterNate: {
//     height: verticalScale(23),
//     aspectRatio: 1,
//   },
//   NoInternateBox: {
//     height: verticalScale(40),
//     aspectRatio: 1,
//     borderRadius: tokens.radius.xxl,
//     backgroundColor: tokens.colors.lightPrimary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: tokens.spacing.smPlus,
//   },
//   troubleShootingText: {
//     fontSize: tokens.fontSize.md,
//     color: tokens.colors.blackDark,
//     fontFamily: fonts.UrbanistMedium,
//   },
//   expireText: {
//     fontSize: tokens.fontSize.xs,
//     color: tokens.colors.secondaryDark,
//     fontFamily: fonts.UrbanistMedium,
//   },
//   views: {
//     height: moderateScale(16),
//     width: moderateScale(16),
//   },
//   viewsTest: {
//     fontFamily: fonts.UrbanistRegular,
//     fontSize: tokens.fontSize.sm,
//     color: tokens.colors.lightGray,
//   },
//   lineBox: {
//     height: 1,
//     width: '100%',
//     backgroundColor: '#E5E5E5',
//   },
//   commonCausesText: {
//     fontSize: tokens.fontSize.xs,
//     color: tokens.colors.secondaryDark,
//     fontFamily: fonts.UrbanistRegular,
//     marginLeft: tokens.spacing.md,
//     marginTop: tokens.spacing.smPlus,
//   },
//   dot: {
//     height: verticalScale(2.5),
//     aspectRatio: 1,
//     borderRadius: tokens.radius.lg,
//     backgroundColor: tokens.colors.secondaryDark,
//     marginHorizontal: tokens.spacing.smPlus,
//   },
//   mainDotBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: tokens.spacing.xs,
//     marginLeft: tokens.spacing.mdPlus,
//   },
//   expireBox: {
//     marginBottom: tokens.spacing.mdPlus,
//   },
//   wasTest: {
//     fontSize: tokens.fontSize.xs,
//     color: tokens.colors.blackDark,
//     fontFamily: fonts.UrbanistSemiBold,
//   },
//   dislikeIcon: {
//     height: moderateScale(20),
//     width: moderateScale(20),
//   },
//   likeIcon: {
//     height: moderateScale(18),
//     width: moderateScale(18),
//     // transform: [{ rotate: '180deg' }],
//     marginRight: tokens.spacing.sm,
//   },
//   likePosition: {
//     transform: [{ rotate: '180deg' }],
//   },
//   MainLikeDislikeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   likeDisLikeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: theme.tokens.spacing.md,
//     marginTop: tokens.spacing.sm,
//     marginBottom: tokens.spacing.xxs,
//   },
// });
