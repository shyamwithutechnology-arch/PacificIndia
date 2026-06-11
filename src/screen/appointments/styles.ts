import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize, insets } =
    theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: tokens.spacing.md,
      marginTop: tokens.spacing.mdPlus,
    },
    searchRowCustom: {
      marginTop: 0,
      marginBottom: 0,
      marginRight: tokens.spacing.sm,
    },
    cart: {
      backgroundColor: tokens.colors.white,
      elevation: 10,
      shadowColor: '#E8E8E8',
      borderColor: '#DEDEDE',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
      borderLeftColor: tokens.colors.primary,
      borderLeftWidth: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cartInner: {
      width: '94%',
    },
    listContainer: {
      paddingTop: tokens.spacing.smPlus,
      paddingBottom: insets.bottom + tokens.spacing.xxxl,
    },
    nameLebelText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
    },
    nameText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
    },
    innerContainer: {
      paddingBottom: insets.bottom + tokens.spacing.xxl,
    },
  });
};
// export const styles = StyleSheet.create({
//   drawerIcon: {
//     height: moderateScale(20),
//     width: moderateScale(20),
//   },
//   categoryBox: {},
// });
