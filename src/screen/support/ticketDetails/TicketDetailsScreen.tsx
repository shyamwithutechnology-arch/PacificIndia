// import React, { useState } from 'react';
// import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { colors, Fonts } from '../../../theme';
// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { moderateScale, verticalScale } from '../../../utils/responsiveSize';
// import AppTextInput from '../../../component/apptextinput/AppTextInput';
// import AppButton from '../../../component/button/AppButton';
// import { Icons } from '../../../assets/icons';
// import { styles } from '../styles';

// export type TicketDetailsScreenProps = {};
// const TicketDetailsScreen = (props: TicketDetailsScreenProps) => {
//   const [reply, setReply] = useState('');

//   // const handlegoBack = () => {
//   //   props.navigation.goBack()
//   // }
//   const handleGoBack = () => {
//     props.navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         backgroundColor={colors.lightThemeBlue}
//         barStyle={'dark-content'}
//       />
//       <SafeAreaView
//         style={{ backgroundColor: colors.lightThemeBlue }}
//         edges={['top']}
//       >
//         <HeaderPaperModule title="Ticket Detail" leftIconPress={handleGoBack} />
//       </SafeAreaView>

//       <SafeAreaView
//         style={styles.HomeCotainer}
//         edges={['left', 'right', 'bottom']}
//       >
//         <View style={styles.invoiceBox}>
//           <Text style={styles.invoiceText}>Invoice Issue</Text>
//         </View>
//         <View style={[styles.invoiceBox, { marginTop: moderateScale(10) }]}>
//           <Text style={styles.invoiceText}>Invoice Issue</Text>
//         </View>
//         <View style={[styles.invoiceBox, { marginTop: moderateScale(10) }]}>
//           <Text style={styles.invoiceText}>13-01-2026</Text>
//         </View>
//         <View
//           style={[
//             styles.invoiceBox,
//             { marginTop: moderateScale(10), marginBottom: moderateScale(10) },
//           ]}
//         >
//           <Text style={styles.invoiceText}>
//             If you face any issues with your invoice—such as incorrect billing
//             details, missing items, GST errors, or duplicate charges—please
//             contact our support team through the app. We will verify the order{' '}
//           </Text>
//         </View>

//         <AppTextInput
//           value={reply}
//           onChangeText={setReply}
//           style={{
//             height: moderateScale(120),
//             marginTop: moderateScale(0),
//             textAlignVertical: 'top',
//             paddingTop: moderateScale(0),
//             // marginBottom: moderateScale(30),
//           }}
//           placeHolderText="Reply"
//           multiline={true}
//         />

//         <View style={{ marginTop: moderateScale(30) }}>
//           <AppButton
//             title="Submit"
//             style={{ width: '88%', margitTop: moderateScale(100) }}
//           />
//         </View>

//         <View style={styles.mainMaskView}>
//           <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

//           <View style={{}}>
//             <View
//               style={[
//                 styles.supportBox,
//                 { marginHorizontal: moderateScale(0) },
//               ]}
//             >
//               <View style={styles.scrachLine} />
//               <View
//                 style={[
//                   styles.supportBox,
//                   { flexDirection: 'column', alignItems: 'flex-start' },
//                 ]}
//               >
//                 <Text
//                   style={styles.supportText}
//                   onPress={() => navigation.navigate('TicketDetailsScreen')}
//                 >
//                   Support
//                 </Text>
//                 <View style={styles.numberTextBox}>
//                   <Image source={Icons.plus} style={styles.plusImg} />
//                   <Text style={styles.supportNumberText}>91-9510779200</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default TicketDetailsScreen;

import { View, Text } from 'react-native';
import React from 'react';

const TicketDetailsScreen = () => {
  return (
    <View>
      <Text>TicketDetailsScreen</Text>
    </View>
  );
};

export default TicketDetailsScreen;
