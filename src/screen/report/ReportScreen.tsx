// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import {
//   Alert,
//   BackHandler,
//   Dimensions,
//   FlatList,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   ToastAndroid,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import {
//   ScreenLayout,
//   Loader,
//   AppHeader,
//   CustomButton,
//   AppInput,
//   CustomDropDown,
// } from '../../component';
// import { Icons } from '../../assets/icons';
// import { useAppTheme } from '../../hooks/useAppTheme';
// import { createStyles } from './styles';
// import { useFocusEffect } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

// const ReportScreen = ({ navigation }) => {
// const theme = useAppTheme();
// const styles = createStyles(theme);
//   const { width, height } = useWindowDimensions();
//   const [loading, setLoading] = useState(false);
//   const [remarkONArea, setRemarkONArea] = useState('');
//   const [comment, setComment] = useState('');
//   const [workType, setWorkType] = useState('');
//   const [workWith, setWorkWith] = useState('');

//   const [orientation, setOrientation] = useState('PORTRAIT');

//   const isLandscape = width > height;

//   const numColumns = useMemo(() => {
//     if (theme.isTablet) {
//       return isLandscape ? 4 : 4;
//     }
//     return isLandscape ? 2 : 2;
//   }, [isLandscape, theme.isTablet]);

//   const handleRemarkChange = (text: string) => {
//     setRemarkONArea(text);
//   };

//   const handleCommentChange = (text: string) => {
//     setComment(text);
//   };

// const workTypeData = [
//   { value: '1', label: 'Work Type 1' },
//   { value: '2', label: 'Work Type 2' },
//   { value: '3', label: 'Work Type 3' },
// ];
//   const designationData = [
//     { value: '1', label: 'Designation 1' },
//     { value: '2', label: 'Designation 2' },
//     { value: '3', label: 'Designation 3' },
//   ];
//   const workWithData = [
//     { value: '1', label: 'Work With 1' },
//     { value: '2', label: 'Work With 2' },
//     { value: '3', label: 'Work With 3' },
//   ];

//   // Detect orientation changes
//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       if (window.width > window.height) {
//         setOrientation('LANDSCAPE');
//       } else {
//         setOrientation('PORTRAIT');
//       }
//     });
//     return () => subscription?.remove();
//   }, []);

//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           title="Medwell Pacific"
//           leftIcon={Icons.drawerIcon}
//           onPress={() => navigation.openDrawer()}
//         />
//       }
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.label}>Name</Text>
//             <Text style={styles.value}>Deepak Singh</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>FSCode</Text>
//             <Text style={styles.value}>1Arjn01</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>EMP Code</Text>
//             <Text style={styles.value}>048040</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>HQ</Text>
//             <Text style={styles.value}>SRIGANGANAGAR</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>MCR No</Text>
//             <Text style={styles.value}>46082901</Text>
//           </View>

//           <Text style={[styles.label, styles.mcrRow]}>Remark On Area</Text>
// <AppInput
//   value={remarkONArea}
//   handleChange={handleRemarkChange}
//   inputBoxStyle={styles.remarkInput}
// />

//           <Text style={styles.label}>Comments</Text>
// <View style={styles.commentBox}>
//   <TextInput
//     value={comment}
//     onChangeText={handleCommentChange}
//     style={styles.commentInput}
//     multiline
//     placeholder="Enter your comment..."
//   />
// </View>

// <Text style={styles.label}>Work Types*</Text>
// <CustomDropDown
//   data={workTypeData}
//   value={workType}
//   onChange={setWorkType}
// />
//         </View>

//         <Text style={styles.label}>WorkWith*</Text>
//         <CustomDropDown
//           data={workWithData}
//           value={workWith}
//           onChange={setWorkWith}
//         />

//       </ScrollView>
//     </ScreenLayout>
//   );
// };

// export default ReportScreen;
// {
//   // <Loader visible={loading} />
// }

import { StatusBar, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomDropDown,
  CustomButton,
} from '../../component';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppDatePicker from '../../component/appDatePicker/AppDatePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ReportScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [comment, setComment] = useState('');
  const [workType, setWorkType] = useState('');
  const [workWith, setWorkWith] = useState('');
  const [hqType, setHqType] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [doctor, setDoctor] = useState('');
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [date, setDate] = useState('');
  const [dateVisible, setDateVisible] = useState(false);
  const [input, setInput] = useState({
    name: '',
    EmpCode: '',
    visitOrder: '',
    comment: '',
  });

  const handleChange = (field: string, value: string) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleDateChange = (val) => {
    setDate(val);
  };
  const handleDateVisible = () => {
    setDateVisible(true);
  };
  const handleDateClose = () => {
    setDateVisible(false);
  };
  const placeOfWorkData = [
    { value: '1', label: 'Place of Work 1' },
    { value: '2', label: 'Place of Work 2' },
    { value: '3', label: 'Place of Work 3' },
  ];
  const doctorData = [
    { value: '1', label: 'Doctor 1' },
    { value: '2', label: 'Doctor 2' },
    { value: '3', label: 'Doctor 3' },
  ];
  const townData = [
    { value: '1', label: 'Town 1' },
    { value: '2', label: 'Town 2' },
    { value: '3', label: 'Town 3' },
  ];
  const cityData = [
    { value: '1', label: 'City 1' },
    { value: '2', label: 'City 2' },
    { value: '3', label: 'City 3' },
  ];
  const workTypeData = [
    { value: '1', label: 'Work Type 1' },
    { value: '2', label: 'Work Type 2' },
    { value: '3', label: 'Work Type 3' },
  ];
  const HQTypeData = [
    { value: '1', label: 'Work Type 1' },
    { value: '2', label: 'Work Type 2' },
    { value: '3', label: 'Work Type 3' },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#0093D3'} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerBox}>
        <AppHeader
          title={'Manager Call Report'}
          onPress={() => {}}
          notificationPress={() => {}}
          backIcon={true}
        />
      </SafeAreaView>

      <View style={styles.card}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.flex]}
        >
          <Text style={styles.label}>Name</Text>
          <AppInput
            value={input.name}
            handleChange={(value) => handleChange('name', value)}
            inputBoxStyle={styles.remarkInput}
          />

          <Text style={styles.label}>EMP Code</Text>
          <AppInput
            value={input.EmpCode}
            handleChange={(value) => handleChange('EmpCode', value)}
            inputBoxStyle={styles.remarkInput}
          />

          <Text style={styles.label}>HQ*</Text>

          <CustomDropDown
            data={HQTypeData}
            value={hqType}
            onChange={setHqType}
            dropDownContainer={[styles.dropDown, styles.hqDropDown]}
            placeholder="Select HQ"
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>Work Types*</Text>
          <CustomDropDown
            data={HQTypeData}
            value={hqType}
            onChange={setHqType}
            placeholder="Select Work Type"
            dropDownContainer={[styles.dropDown, styles.hqDropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>WorkedWith*</Text>
          <CustomDropDown
            data={workTypeData}
            value={workType}
            onChange={setWorkType}
            placeholder="Select Work Type"
            dropDownContainer={[styles.dropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>City*</Text>
          <CustomDropDown
            data={cityData}
            value={city}
            onChange={setCity}
            placeholder="Select City"
            dropDownContainer={[styles.dropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>Town*</Text>
          <CustomDropDown
            data={townData}
            value={town}
            onChange={setTown}
            placeholder="Select Town"
            dropDownContainer={[styles.dropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />
          <Text style={styles.label}>Doctor*</Text>

          <CustomDropDown
            data={doctorData}
            value={doctor}
            onChange={setDoctor}
            placeholder="Select Doctor"
            dropDownContainer={[styles.dropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>Place of Work*</Text>
          <CustomDropDown
            data={placeOfWorkData}
            value={placeOfWork}
            onChange={setPlaceOfWork}
            placeholder="Select Place of Work"
            dropDownContainer={[styles.dropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>Reporting Date*</Text>
          <AppDatePicker
            value={date}
            onchange={handleDateChange}
            visible={dateVisible}
          />

          <Text style={styles.label}>Visit Order*</Text>
          <AppInput
            value={input.visitOrder}
            handleChange={(value) => handleChange('visitOrder', value)}
            inputBoxStyle={styles.remarkInput}
          />

          <Text style={styles.label}>Remark on Area*</Text>
          <View style={styles.commentBox}>
            <TextInput
              value={input.comment}
              onChangeText={(val) => handleChange('comment', value)}
              style={styles.commentInput}
              multiline
              placeholder="Enter your comment..."
            />
          </View>

          <CustomButton title="Submit Report" style={styles.submitReportBtn} />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ReportScreen;
