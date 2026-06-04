// import React from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { colors, Fonts } from '../theme';
// import CheckIcon from 'react-native-vector-icons/FontAwesome6';
// import CrossIcon from 'react-native-vector-icons/Entypo';
// import { useAppTheme } from '../hooks/useAppTheme';
// interface ToastProps {
//   text1?: string;
//   text2?: string;
// }
//   const theme = useAppTheme()
// const styles = createStyles(theme)

// export const toastConfig = {
//   success: ({ text1, text2 }: ToastProps) => (
//     <View style={[styles.toast, styles.success]}>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <View style={styles.checkIconBox}>
//           <CheckIcon
//             name="check"
//             size={moderateScale(14.5)}
//             color={colors.white}
//           />
//         </View>
//         <View style={styles.successRightBox}>
//           <Text style={styles.text1}>{text1}</Text>
//           {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
//         </View>
//       </View>
//       <Pressable style={styles.crossBox}>
//         <CrossIcon name="cross" color={colors.black} size={moderateScale(20)} />
//       </Pressable>
//     </View>
//   ),
//   error: ({ text1, text2 }: ToastProps) => (
//     <View style={[styles.toast, styles.error]}>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <View style={[styles.checkIconBox, { backgroundColor: '#FB5758' }]}>
//           {/* <ErrorIcon name="error-outline" size={moderateScale(16)} color={colors.white} /> */}
//           <CrossIcon
//             name="cross"
//             color={colors.white}
//             size={moderateScale(20)}
//           />
//         </View>
//         <View style={styles.successRightBox}>
//           <Text style={[styles.text1, { color: colors.red }]}>{text1}</Text>
//           {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
//         </View>
//       </View>
//       <Pressable style={styles.crossBox}>
//         <CrossIcon name="cross" color={colors.black} size={moderateScale(20)} />
//       </Pressable>
//     </View>
//   ),
//   info: ({ text1, text2 }: ToastProps) => (
//     <View style={[styles.toast, styles.info]}>
//       <Text style={styles.text1}>{text1}</Text>
//       {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
//     </View>
//   ),
// };

// const styles = StyleSheet.create({
//   toast: {
//     width: '92%',
//     // padding: moderateScale(12),
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: moderateScale(10),
//     borderRadius: moderateScale(16),
//     marginHorizontal: moderateScale(10),
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     // shadowRadius: 4,
//     // elevation: ,
//     justifyContent: 'space-between',
//   },
//   checkIconBox: {
//     backgroundColor: '#4FDD6B',
//     borderRadius: moderateScale(100),
//     height: moderateScale(30),
//     width: moderateScale(30),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   success: {
//     backgroundColor: '#F1F9F4',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#53CA75',
//     borderWidth: 1.8,
//   },
//   successRightBox: { marginLeft: moderateScale(13) },
//   // error: { backgroundColor: '#FF4444', flexDirection: 'row', alignItems: 'center' },
//   error: {
//     backgroundColor: '#FCEFEA',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#E84C55',
//     borderWidth: 1.5,
//   },
//   info: { backgroundColor: '#EBBC3F' },
//   // text1: { fontFamily: Fonts.InterBold, color: '#5A5F5C', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
//   text1: {
//     fontFamily: Fonts.InterBold,
//     color: colors.green,
//     fontSize: moderateScale(16),
//     marginBottom: moderateScale(2),
//   },
//   // text1: { fontFamily: Fonts.InterBold, color: '#000', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
//   text2: {
//     color: '#68625D',
//     fontSize: moderateScale(13),
//     marginTop: moderateScale(2),
//     fontFamily: Fonts.InterMedium,
//     width: moderateScale(250),
//   },
//   crossBox: {
//     height: moderateScale(26),
//     width: moderateScale(26),
//     backgroundColor: colors.white,
//     // borderWidth: 1,
//     borderRadius: moderateScale(4),
//     alignItems: 'center',
//     justifyContent: 'center',
//     // elevation: 10,
//     shadowRadius: moderateScale(4),
//     shadowColor: colors.white,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CheckIcon from 'react-native-vector-icons/FontAwesome6';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { AppTheme, useAppTheme } from '../hooks/useAppTheme';
import { Fonts } from '../theme';

interface ToastProps {
  text1?: string;
  text2?: string;
}

const ToastWrapper = ({
  type,
  text1,
  text2,
}: ToastProps & { type: 'success' | 'error' | 'info' }) => {
  const theme = useAppTheme();
  const { moderateScale, tokens } = theme;
  const styles = createStyles(theme);

  const isError = type === 'error';

  return (
    <View
      style={[
        styles.toast,
        type === 'success' && styles.success,
        type === 'error' && styles.error,
        type === 'info' && styles.info,
      ]}
    >
      <View style={styles.row}>
        {type !== 'info' && (
          <View
            style={[
              styles.checkIconBox,
              isError && { backgroundColor: '#FB5758' },
            ]}
          >
            {isError ? (
              <CrossIcon
                name="cross"
                color={tokens.colors.white}
                size={moderateScale(18)}
              />
            ) : (
              <CheckIcon
                name="check"
                color={tokens.colors.white}
                size={moderateScale(14)}
              />
            )}
          </View>
        )}

        <View style={styles.successRightBox}>
          <Text style={[styles.text1, isError && { color: tokens.colors.red }]}>
            {text1}
          </Text>

          {!!text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
      </View>

      {type !== 'info' && (
        <Pressable style={styles.crossBox}>
          <CrossIcon
            name="cross"
            color={tokens.colors.black}
            size={moderateScale(18)}
          />
        </Pressable>
      )}
    </View>
  );
};

export const toastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <ToastWrapper type="success" text1={text1} text2={text2} />
  ),

  error: ({ text1, text2 }: ToastProps) => (
    <ToastWrapper type="error" text1={text1} text2={text2} />
  ),

  info: ({ text1, text2 }: ToastProps) => (
    <ToastWrapper type="info" text1={text1} text2={text2} />
  ),
};

const createStyles = (theme: AppTheme) => {
  const { moderateScale, tokens } = theme;
  return StyleSheet.create({
    toast: {
      width: '92%',
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScale(10),
      borderRadius: moderateScale(16),
      marginHorizontal: moderateScale(10),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 2 },
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },

    checkIconBox: {
      backgroundColor: '#4FDD6B',
      borderRadius: moderateScale(100),
      height: moderateScale(30),
      width: moderateScale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },

    success: {
      backgroundColor: '#F1F9F4',
      borderColor: '#53CA75',
      borderWidth: 1.5,
    },

    error: {
      backgroundColor: '#FCEFEA',
      borderColor: '#E84C55',
      borderWidth: 1.5,
    },

    info: {
      backgroundColor: '#EBBC3F',
    },

    successRightBox: {
      marginLeft: moderateScale(12),
      flex: 1,
    },

    text1: {
      fontFamily: Fonts.ManropeBold,
      color: tokens.colors.green,
      fontSize: tokens.fontSize.lg,
    },

    text2: {
      color: '#68625D',
      fontSize: tokens.fontSize.sm,
      marginTop: moderateScale(2),
      fontFamily: Fonts.ManropeMedium,
    },

    crossBox: {
      height: moderateScale(26),
      width: moderateScale(26),
      backgroundColor: tokens.colors.white,
      borderRadius: moderateScale(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
