import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { tokens } = theme;
  return StyleSheet.create({
    container: {
      marginTop: tokens.spacing.md,
    },
    imageWrapper: {
      flex: 1,
      overflow: 'hidden',
      marginHorizontal: tokens.spacing.xxs,
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
  });
};
