import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, moderateScale, verticalScale, scale } = theme;
  return StyleSheet.create({
    container: {
      width: '100%',
    },
    dropdown: {
      height: verticalScale(39),
      borderColor: tokens.colors.lightPrimary,
      borderWidth: 0.5,
      borderRadius: tokens.radius.lg,
      paddingHorizontal: tokens.spacing.sm,
    },
    placeholder: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
    },
    selectedText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeRegular,
    },
    icon: {
      width: moderateScale(19),
      height: moderateScale(19),
      marginRight: tokens.spacing.smPlus,
      resizeMode: 'contain',
    },

    itemContainer: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderWidth: 1,
      marginVertical: tokens.spacing.xsPlus,
      borderRadius: scale(6),
      borderColor: '#d6d4d4',
      // backgroundColor: 'red',
    },
    selectedItemContainer: {
      backgroundColor: tokens.colors.primary,
    },
    containerDropdown: {
      backgroundColor: '#ecebeb',
      // backgroundColor: '#e1e1e1',
    },
    itemText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeRegular,
    },
    selectedItemText: {
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeSemiBold,
    },
  });
};

// import { StyleSheet } from 'react-native';
// import { AppTheme } from '../../hooks/useAppTheme';
// import { createTokens } from '../../theme';

// export const createStyles = (theme: AppTheme) => {
//   const { verticalScale, scale, moderateScale, tokens } = theme;
//   return StyleSheet.create({
//     dropDownBox: {
//       zIndex: 1000, // ✅ MUST
//       elevation: 1000,
//     },
//     dropDown: {
//       borderColor: tokens.colors.lightGray,
//       borderWidth: 0.5,
//       width: '100%',
//       alignSelf: 'center',
//     },
//     dropDownContainer: {
//       // borderColor: tokens.colors.lightGray,
//       // borderWidth: 0.3,
//       marginHorizontal: tokens.spacing.md,
//       width: '100%',
//       alignSelf: 'center',
//     },
//     wrapper: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderColor: tokens.colors.lightGray,
//       borderWidth: 0.3,
//       borderRadius: 8,
//       paddingHorizontal: 10,
//     },
//   });
// };

// // paddingVertical: tokens.spacing.xxl,
// // borderWidth: 1,
// // borderColor: tokens.colors.borderColor,
// // backgroundColor: 'green',

// // import React from 'react';
// // import { View } from 'react-native';
// // import DropDownPicker from 'react-native-dropdown-picker';

// // const CustomDropDown = ({
// //   open,
// //   value,
// //   items,
// //   setOpen,
// //   setValue,
// //   setItems,
// // }) => {

// //   return (
// //     <View style={{ zIndex: 1000 }}>
// //       <DropDownPicker
// //         open={open}
// //         value={value}
// //         items={items}
// //         setOpen={setOpen}
// //         setValue={setValue}
// //         setItems={setItems}
// //         placeholder="Select item"
// //         style={{ borderColor: '#ccc' }}
// //         dropDownContainerStyle={{ borderColor: '#ccc', }}
// //       />
// //     </View>
// //   );
// // };

// // export default CustomDropDown;
