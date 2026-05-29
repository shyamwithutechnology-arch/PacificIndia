// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   StatusBar,
//   TextInput,
//   Image,
//   FlatList,
//   Pressable,
// } from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import { styles } from './styles';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import AppDropDown from '../../component/dropdown/AppDropDown';
// import AppButton from '../../component/button/AppButton';
// import { showToast } from '../../utils/toast';
// import { GET, POST_FORM } from '../../api/request';
// import { ApiEndPoint } from '../../api/endPoints';
// import { localStorage, storageKeys } from '../../storage/storage';
// import Loader from '../../component/loader/Loader';
// import { useNavigation } from '@react-navigation/native';
// import ListFooterComponent from './component/listFooter/ListFooterComponent';
// import HeaderComponent from './component/headerComponent/HeaderComponent';
// import QuestionMarkIcon from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../theme';
// import {
//   moderateScale,
//   scale,
//   verticalScale,
// } from '../../utils/responsiveSize';
// import { Icons } from '../../assets/icons';

// export type SupportScreenProps = {};
// export type Article = {
//   id: string;
//   title: string;
//   views: number;
//   description: string[];
// };

// export const articleList: Article[] = [
//   {
//     id: '1',
//     title: 'Troubleshooting payment issue',
//     views: 534,
//     description: [
//       'Expired credit card',
//       'Insufficient funds',
//       'Network issue during transaction',
//       'Incorrect CVV entered',
//       'Bank server down',
//     ],
//   },
//   {
//     id: '2',
//     title: 'App not loading properly',
//     views: 210,
//     description: [
//       'Check internet connection',
//       'Clear app cache',
//       'Update app to latest version',
//       'Restart your device',
//       'Server maintenance issue',
//     ],
//   },
//   {
//     id: '3',
//     title: 'Unable to login account',
//     views: 320,
//     description: [
//       'Wrong username or password',
//       'Account temporarily locked',
//       'OTP not received',
//       'Network issue',
//       'Server downtime',
//     ],
//   },
// ];

// const SupportScreen = (props: SupportScreenProps) => {
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();

//   const [comment, setComment] = useState('');
//   const [userId, setUserId] = useState('');
//   const [faqTicket, setFaqTicket] = useState([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [dropDownValue, setDropDownValue] = useState<string | null>('');
//   const [errors, setErrors] = useState({
//     dropDownValue: '',
//     comment: '',
//   });

//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [feedback, setFeedback] = useState<
//     Record<string, 'like' | 'dislike' | null>
//   >({});

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleNewTicket = useCallback(() => {
//     navigation.navigate('NewTicket');
//   }, [navigation]);

//   const toggleExpand = (id: string) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   const handleFeedback = (id: string, type: 'like' | 'dislike') => {
//     setFeedback((prev) => {
//       const current = prev[id];

//       return {
//         ...prev,
//         [id]: current === type ? null : type, // toggle
//       };
//     });
//   };

//   const handleCommentChange = (text) => {
//     setComment(text);
//     if (errors.comment) {
//       setErrors((prev) => ({ ...prev, comment: '' }));
//     }
//   };

//   const handleDropdownChange = (value: string | null) => {
//     setDropDownValue(value);
//     setErrors((pre) => ({ ...pre, dropDownValue: '' }));
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!dropDownValue?.trim()) {
//       newErrors.dropDownValue = 'Please select issue type';
//     }
//     if (!comment.trim()) {
//       newErrors.comment = 'Type a message...';
//     }
//     return newErrors;
//   };

//   const handleSupport = async () => {
//     try {
//       const validationErrors = validateForm();
//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       }

//       const params = {
//         usr_id: userId,
//         usr_subject: dropDownValue,
//         usr_comment: comment,
//       };

//       setLoading(true);
//       const response = await POST_FORM(ApiEndPoint.support, params);
//       console.log('response', response);

//       if (response.status === 200 || response.status === '1') {
//         showToast(
//           'success',
//           'Success',
//           response?.msg || 'Your delete request submitted successfully'
//         );
//       } else {
//         showToast('error', 'Error', 'Your delete request faild');
//       }
//     } catch (error) {
//       if (error.offline) {
//         return true;
//       }
//       const errorMessage =
//         error?.response.data.msg ||
//         error.msg ||
//         'Something went wrong. Please try again.';
//       showToast('error', 'Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFetchTicketFaq = async () => {
//     try {
//       setLoading(true);
//       const response = await GET(ApiEndPoint.ticketFaq);

//       if (response.status === 200 || response.status === '1') {
//         console.log('aaaaaaaaaares', response);
//         setFaqTicket(response?.result);
//       } else {
//         showToast('error', 'Error', 'Your ticket request faild');
//       }
//     } catch (error) {
//       if (error.offline) {
//         return true;
//       }
//       const errorMessage =
//         error?.response.data.msg ||
//         error.msg ||
//         'Something went wrong. Please try again.';
//       showToast('error', 'Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;
//     const selected = feedback[item.id];
//     console.log('isssssstem', item);

//     return (
//       <View style={styles.troubleShootingBox}>
//         <Pressable
//           style={styles.rowBetween}
//           onPress={() => toggleExpand(item.id)}
//         >
//           <View style={[styles.mainDotBox]}>
//             <View style={styles.NoInternateBox}>
//               <QuestionMarkIcon
//                 name="question"
//                 color={'#585858'}
//                 size={moderateScale(18)}
//               />
//             </View>

//             <Text style={styles.troubleShootingText}>{item?.tf_title}</Text>
//           </View>

//           <Icon
//             name={isExpanded ? 'chevron-up' : 'chevron-down'}
//             size={moderateScale(17)}
//             color={'#585858'}
//           />
//         </Pressable>

//         {isExpanded && (
//           <View style={{ backgroundColor: '#f8f7f7' }}>
//             <View style={styles.lineBox} />
//             <Text style={styles.commonCausesText}>
//               Common causes of payment issue include:
//             </Text>

//             <View style={styles.mainDotBox}>
//               <View style={styles.dot} />
//               <Text style={styles.expireText}>{item?.tf_description}</Text>
//             </View>
//             {
//               // <View style={[styles.mainDotBox, styles.expireBox]}>
//               //   <View style={styles.dot} />
//               //   <Text style={styles.expireText}>Insuffiecient funds.</Text>
//               // </View>
//               // <View style={styles.lineBox} />
//             }
//             <View style={styles.likeDisLikeBox}>
//               <Text style={styles.wasTest}>Was that Helpful?</Text>

//               <View style={styles.MainLikeDislikeBox}>
//                 <Pressable onPress={() => handleFeedback(item.id, 'like')}>
//                   <Image
//                     source={
//                       selected === 'like' ? Icons.likeFillIcon : Icons.likeIcon
//                     }
//                     style={styles.likeIcon}
//                     resizeMode="contain"
//                   />
//                 </Pressable>

//                 <Pressable onPress={() => handleFeedback(item.id, 'dislike')}>
//                   <Image
//                     source={
//                       selected === 'dislike'
//                         ? Icons?.dislikeFillIcon
//                         : Icons?.dislikeIcon
//                     }
//                     style={[styles.likeIcon, { marginRight: 0 }]}
//                     resizeMode="contain"
//                   />
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   useEffect(() => {
//     const getFaqTicket = async () => {
//       await handleFetchTicketFaq();
//     };
//     getFaqTicket();
//   }, []);

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
//         <HeaderPaperModule title={'Support'} leftIconPress={handleBack} />
//       </SafeAreaView>

//       <SafeAreaView
//         style={styles.container}
//         edges={['left', 'right', 'bottom']}
//       >
//         <Loader visible={loading} />

//         <FlatList
//           data={faqTicket}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingHorizontal: scale(16),
//             paddingBottom: insets.bottom + verticalScale(20),
//           }}
//           ListFooterComponentStyle={{
//             marginBottom: verticalScale(12),
//           }}
//           ListFooterComponent={<ListFooterComponent />}
//           ListHeaderComponent={() => (
//             <Text style={styles.needForText}>Helpful Articles</Text>
//           )}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default SupportScreen;

// // ListHeaderComponent={<HeaderComponent />}

// // ListFooterComponent={<ListFooterComponent onPress={handleNewTicket} />}

// // <ListFooterComponent onPress={handleNewTicket} />
// // <HeaderComponent />

// //  <View
// //                 style={[
// //                   styles.mainDotBox,
// //                   {
// //                     marginVertical: 0,
// //                     marginLeft: 0,
// //                     marginTop: verticalScale(12),
// //                   },
// //                 ]}
// //               >
// //                 <Image
// //                   source={Icons.views}
// //                   style={styles.views}
// //                   resizeMode="contain"
// //                 />
// //                 <Text style={styles.viewsTest}> {item.views} Views</Text>
// //               </View>

import { View, Text } from 'react-native';
import React from 'react';

const SupportScreen = () => {
  return (
    <View>
      <Text>SupportScreen</Text>
    </View>
  );
};

export default SupportScreen;
