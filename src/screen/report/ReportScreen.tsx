import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomDropDown,
  CustomButton,
} from '../../component';
import AppDatePicker from '../../component/appDatePicker/AppDatePicker';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatDateDayMonthShortYear } from '../../../src/utils/date';
import { Icons } from '../../assets/icons';

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
  const [show, setShow] = useState(false);
  const formatedDate = formatDateDayMonthShortYear(date);
  const isTablet = theme.isTablet;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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

  const handleVisibleDate = () => {
    setDateVisible(true);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    // setErrors((prev) => ({
    //   ...prev,
    //   date: '',
    // }));
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
          leftIcon={Icons.leftIcon}
          onPress={() => {}}
          notificationPress={() => {}}
          backIcon={true}
          headerContainer={styles.headerContainer}
        />
      </SafeAreaView>

      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.card}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.Contentcontainer]}
          extraScrollHeight={0}
          extraHeight={0}
          enableAutomaticScroll={true}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <View style={isTablet || isLandscape ? styles.formRow : undefined}>
            <View
              style={isTablet || isLandscape ? styles.nameField : undefined}
            >
              <Text style={styles.label}>Name</Text>
              <AppInput
                value={input.name}
                handleChange={(value) => handleChange('name', value)}
                inputBoxStyle={[styles.remarkInput, styles.inputBgColor]}
                placeholderText="Please enter text"
              />
            </View>
            <View
              style={isTablet || isLandscape ? styles.empCodeField : undefined}
            >
              <Text style={styles.label}>EMP Code</Text>
              <AppInput
                value={input.EmpCode}
                handleChange={(value) => handleChange('EmpCode', value)}
                inputBoxStyle={[styles.remarkInput, styles.inputBgColor]}
                placeholderText="Please enter EmpCode"
              />
            </View>
          </View>

          <View style={isTablet || isLandscape ? styles.formRow : undefined}>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>HQ*</Text>
              <CustomDropDown
                data={HQTypeData}
                value={hqType}
                onChange={setHqType}
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholder="Select HQ"
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>Work Type*</Text>
              <CustomDropDown
                data={HQTypeData}
                value={hqType}
                onChange={setHqType}
                placeholder="Select Work Type"
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
          </View>

          <View style={isTablet || isLandscape ? styles.formRow : undefined}>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>WorkedWith*</Text>
              <CustomDropDown
                data={workTypeData}
                value={workType}
                onChange={setWorkType}
                placeholder="Select WorkedWith"
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>City*</Text>
              <CustomDropDown
                data={cityData}
                value={city}
                onChange={setCity}
                placeholder="Select City"
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
          </View>

          <View style={isTablet || isLandscape ? styles.formRow : undefined}>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>Town*</Text>
              <CustomDropDown
                data={townData}
                value={town}
                onChange={setTown}
                placeholder="Select Town"
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>Place of Work*</Text>
              <CustomDropDown
                data={placeOfWorkData}
                value={placeOfWork}
                onChange={setPlaceOfWork}
                placeholder="Select Place of Work"
                dropDownContainer={[styles.dropDown, styles.hqDropDown]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
            </View>
          </View>

          <Text style={styles.label}>Doctor*</Text>
          <CustomDropDown
            data={doctorData}
            value={doctor}
            onChange={setDoctor}
            placeholder="Select Doctor"
            dropDownContainer={[styles.dropDown, styles.hqDropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <View style={isTablet || isLandscape ? styles.formRow : undefined}>
            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>Reporting Date*</Text>
              <Pressable
                style={styles.dateSelectBox}
                onPress={handleVisibleDate}
              >
                <Text style={styles.selectDate}>
                  {' '}
                  {date ? formatedDate : 'Select Reporting Date'}
                </Text>
              </Pressable>
            </View>
            <AppDatePicker
              value={date || new Date()}
              onChange={handleDateChange}
              visible={dateVisible}
              onClose={handleDateClose}
            />

            <View
              style={isTablet || isLandscape ? styles.halfField : undefined}
            >
              <Text style={styles.label}>Visit Order*</Text>
              <AppInput
                value={input.visitOrder}
                handleChange={(value) => handleChange('visitOrder', value)}
                inputBoxStyle={[styles.remarkInput, styles.inputBgColor]}
                placeholderText="Visit order"
                editable={false}
              />
            </View>
          </View>

          <Text style={styles.label}>Remarks on Area*</Text>
          <View style={styles.commentBox}>
            <TextInput
              value={input.comment}
              onChangeText={(val) => handleChange('comment', value)}
              style={[styles.commentInput, styles.remarkInputBox]}
              multiline
              placeholder="Enter Remarks... "
            />
          </View>

          <Text style={[styles.label, styles.commentText]}>Comments*</Text>
          <View style={styles.commentBox}>
            <TextInput
              value={input.comment}
              onChangeText={(val) => handleChange('comment', value)}
              style={styles.commentInput}
              multiline
              placeholder="Enter comment..."
            />
          </View>

          <CustomButton
            title="Submit Report"
            style={styles.submitReportBtn}
            textStyle={styles.textStyle}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ReportScreen;
