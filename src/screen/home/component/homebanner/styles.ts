import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      marginTop: moderateScale(10),
    },
    imageWrapper: {
      flex: 1,
      overflow: 'hidden',
      marginHorizontal: moderateScale(2),
      // borderWidth:1,
      // borderColor:'#000',
      // marginBottom:moderateScale(100),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    //   dot: {
    //     backgroundColor: '#D0D5DD',
    //   },
    //   activeDot: {
    //     backgroundColor: '#0C406F',
    //   },
    dotWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: tokens.spacing.sm,
    },

    dot: {
      width: moderateScale(7),
      height: moderateScale(7),
      borderRadius: tokens.radius.sm,
      marginHorizontal: tokens.spacing.xs,
      backgroundColor: theme.tokens.colors.borderColor,
    },

    activeDot: {
      width: moderateScale(18),
      borderRadius: tokens.radius.lg,
      backgroundColor: theme.tokens.colors.primary,
    },
  });
};
