import React, { useEffect, useState } from 'react';
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
  Loader,
} from '../../component';
import AppDatePicker from '../../component/appDatePicker/AppDatePicker';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatDateDayMonthShortYear } from '../../../src/utils/date';
import { Icons } from '../../assets/icons';
import { showToast } from '../../../src/utils/toast';
import { GET, POST_FORM } from '../../../src/api/request';
import { ApiEndPoint } from '../../../src/api/endPoints';
import { localStorage, storageKeys } from '../../../src/storage/storage';

const ReportScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [comment, setComment] = useState('');
  const [workType, setWorkType] = useState('');
  const [workWith, setWorkWith] = useState('');
  const [loading, setLoading] = useState(false);
  const [hqType, setHqType] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [team, setTeam] = useState('');
  const [doctor, setDoctor] = useState('');
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [date, setDate] = useState(null);

  const [dateVisible, setDateVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [hqList, setHqList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const formatedDate = formatDateDayMonthShortYear(date);
  const isTablet = theme.isTablet;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const today = new Date();

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  const [input, setInput] = useState({
    name: '',
    empCode: '',
    workType: '',
    visitOrder: '',
    comment: '',
    remark: '',
  });

  const [errors, setErrors] = useState({
    hqType: '',
    workType: '',
    city: '',
    town: '',
    placeOfWork: '',
    doctor: '',
    reportingDate: '',
    visitOrder: '',
    remark: '',
    comment: '',
  });

  const handleChange = (field: string, value: string) => {
    let updatedValue = value;

    if (field === 'visitOrder') {
      updatedValue = value.replace(/[^0-9]/g, '');
    }
    setInput((prevInput) => ({
      ...prevInput,
      [field]: updatedValue,
    }));

    setErrors((prevInput) => ({ ...prevInput, [field]: '' }));
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleVisibleDate = () => {
    setDateVisible(true);
    clearError('reportingDate');
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

  const handleHqChange = async (id) => {
    setHqType(id);
    clearError('hqType');
    await handleCity(id);
  };

  const handleWorkType = async (id) => {
    setWorkType(id);
    clearError('workType');
  };

  const hadleChangeCity = async (id) => {
    setCity(id);
    clearError('city');
    await handleTown(id);
  };

  const handleTownChange = async (id) => {
    setTown(id);
    clearError('town');
    await handleDoctorList(id);
  };

  const handleChangePlaceOfWork = async (id) => {
    setCity(id);
    clearError('placeOfWork');
  };

  const handleChangeDoctor = async (id) => {
    setDoctor(id);
    clearError('doctor');
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
    { value: 'Field', label: 'Field' },
    { value: 'Meeting', label: 'Meeting' },
    { value: 'Visit', label: 'Visit' },
  ];
  const HQTypeData = [
    { value: '1', label: 'Work Type 1' },
    { value: '2', label: 'Work Type 2' },
    { value: '3', label: 'Work Type 3' },
  ];

  const fetchHqList = async () => {
    setLoading(true);
    try {
      const res = await GET(ApiEndPoint.hqList);
      if (res?.status === '1') {
        setHqList(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamList = async () => {
    setLoading(true);
    try {
      const res = await GET(ApiEndPoint.listTeam);
      if (res?.status === '1') {
        setTeamList(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCity = async (id) => {
    setLoading(true);
    const params = {
      hq_id: id,
    };
    try {
      const res = await POST_FORM(ApiEndPoint.listCity, params);
      if (res?.status === '1') {
        setCityList(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTown = async (id) => {
    setLoading(true);
    const params = {
      city_id: id,
    };
    try {
      const res = await POST_FORM(ApiEndPoint.listTown, params);
      if (res?.status === '1') {
        setTownList(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorList = async (id) => {
    setLoading(true);
    const params = {
      town_id: id,
    };
    try {
      const res = await POST_FORM(ApiEndPoint.listDoctorTownBase, params);
      if (res?.status === '1') {
        setDoctorList(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      hqType: !hqType ? 'Please select HQ' : '',
      workType: !workType ? 'Please select Work Type' : '',
      city: !city ? 'Please select City' : '',
      town: !town ? 'Please select Town' : '',
      placeOfWork: !city ? 'Please select  Work' : '',
      doctor: !doctor ? 'Please select Doctor' : '',
      reportingDate: !date ? 'Please select Date' : '',
      visitOrder: !input.visitOrder.trim() ? 'Please enter Visit Order' : '',
      remark: !input.remark.trim() ? 'Please enter Remark' : '',
      comment: !input.comment.trim() ? 'Please enter Comment' : '',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleReportSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const params = {
      trp_member_id: memberId,
      trp_hq: hqType,
      trp_work_type: workType,
      trp_work_with: team,
      trp_city_id: city,
      trp_town_id: town,
      trp_doctor_id: doctor,
      trp_place_work: city,
      trp_reporting_date: formatedDate,
      trp_visit_order: input.visitOrder,
      trp_remark_area: input.remark,
      trp_comment: input.comment,
    };
    // console.log('pramaparams', params);

    try {
      const res = await POST_FORM(ApiEndPoint.reportSubmit, params);

      if (res?.status === '1') {
        showToast('success', 'Success', res.msg);
        navigation.navigate('ReportList');
      } else {
        showToast('error', 'Error', res.msg);
      }
    } catch (error) {
      console.log('errrrrqqqqqq', error);

      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatedHq = (hqList ?? [])?.map((item) => ({
    ...item,
    value: item?.hq_id,
    label: item.hq_name,
  }));

  const formatedCity = (cityList ?? [])?.map((item) => ({
    ...item,
    value: item?.city_id,
    label: item.city_name,
  }));

  // const formatedTown = (townList ?? [])?.map((item) => ({
  //   ...item,
  //   value: item?.tw_id,
  //   label: item.tw_name,
  // }));

  const formatedTown = Array.isArray(townList)
    ? townList?.map((item) => ({
        ...item,
        value: item?.tw_id ?? '',
        label: item?.tw_name ?? '',
      }))
    : [];

  const formatedTeam = (teamList ?? [])?.map((item) => ({
    ...item,
    value: item?.member_id,
    label: item.member_name,
  }));

  const formatedDoctor = (doctorList ?? [])?.map((item) => ({
    ...item,
    value: item?.doctor_id,
    label: item.doctor_name,
  }));

  useEffect(() => {
    fetchHqList();
    fetchTeamList();
  }, []);

  useEffect(() => {
    const getMemberName = async () => {
      const member_Name = await localStorage.getItem(storageKeys.member_name);
      const member_id = await localStorage.getItem(storageKeys.member_id);
      const empCode = await localStorage.getItem(storageKeys.empCode);
      setMemberName(member_Name);
      setMemberId(member_id);
      setEmpCode(empCode);
    };
    getMemberName();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#0093D3'} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#0093D3' }}>
        <AppHeader
          title={'Call Report'}
          leftIcon={Icons.leftIcon}
          onPress={handleGoBack}
          notificationPress={() => {}}
          backIcon={true}
          headerContainer={styles.headerContainer}
        />
      </SafeAreaView>

      <Loader visible={loading} />
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.card}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.Contentcontainer]}
          extraHeight={theme.verticalScale(20)}
          extraScrollHeight={theme.verticalScale(60)}
          enableAutomaticScroll={true}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <Text style={styles.label}>Name</Text>

          <AppInput
            value={`${memberName} - ${empCode}`}
            inputBoxStyle={[styles.remarkInput, styles.inputBgColor]}
            placeholderText="Please enter text"
            editable={false}
          />

          <View style={styles.hqRow}>
            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                HQ <Text style={styles.required}>*</Text>
              </Text>
              <CustomDropDown
                data={formatedHq}
                value={hqType}
                onChange={handleHqChange}
                dropDownContainer={[
                  styles.dropDown,
                  !errors.hqType && styles.hqDropDown,
                ]}
                placeholder="Select HQ"
                placeholderTextStyle={styles.placeholderTextStyle}
              />
              {errors.workType ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.workType}
                </Text>
              ) : null}
            </View>

            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                Work Type <Text style={styles.required}>*</Text>
              </Text>
              <CustomDropDown
                data={workTypeData}
                value={workType}
                onChange={handleWorkType}
                placeholder="Select Work Type"
                dropDownContainer={[
                  styles.dropDown,
                  !errors.workType && styles.hqDropDown,
                ]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
              {errors.hqType ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.hqType}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.hqRow}>
            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                City <Text style={styles.required}>*</Text>
              </Text>
              <CustomDropDown
                data={formatedCity}
                value={city}
                onChange={hadleChangeCity}
                placeholder="Select City"
                dropDownContainer={[
                  styles.dropDown,
                  !errors.city && styles.hqDropDown,
                ]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
              {errors.city ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.city}
                </Text>
              ) : null}
            </View>
            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                Town <Text style={styles.required}>*</Text>
              </Text>
              <CustomDropDown
                data={formatedTown}
                value={town}
                onChange={handleTownChange}
                placeholder="Select Town"
                dropDownContainer={[
                  styles.dropDown,
                  !errors.town && styles.hqDropDown,
                ]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
              {errors.town ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.town}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.hqRow}>
            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                Reporting Date <Text style={styles.required}>*</Text>
              </Text>
              <Pressable
                style={[
                  styles.dateSelectBox,
                  !errors.reportingDate && {
                    marginBottom: theme.verticalScale(14),
                  },
                ]}
                onPress={handleVisibleDate}
              >
                <Text style={styles.selectDate}>
                  {' '}
                  {date ? formatedDate : 'Select Date'}
                </Text>
              </Pressable>

              {errors.reportingDate ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.reportingDate}
                </Text>
              ) : null}
            </View>

            <View style={{ width: '48%' }}>
              <Text style={styles.label}>
                Place of Work <Text style={styles.required}>*</Text>
              </Text>
              <CustomDropDown
                data={formatedCity}
                value={city}
                onChange={handleChangePlaceOfWork}
                placeholder="Select POW"
                dropDownContainer={[
                  styles.dropDown,
                  !errors.placeOfWork && styles.hqDropDown,
                ]}
                placeholderTextStyle={styles.placeholderTextStyle}
              />
              {errors.placeOfWork ? (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: theme.verticalScale(14) },
                  ]}
                >
                  {errors.placeOfWork}
                </Text>
              ) : null}
            </View>
          </View>

          <Text style={styles.label}>WorkedWith</Text>
          <CustomDropDown
            data={formatedTeam}
            value={team}
            onChange={setTeam}
            placeholder="Select WorkedWith"
            dropDownContainer={[styles.dropDown, styles.hqDropDown]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />

          <Text style={styles.label}>
            Doctor <Text style={styles.required}>*</Text>
          </Text>

          <CustomDropDown
            data={formatedDoctor}
            value={doctor}
            onChange={handleChangeDoctor}
            placeholder="Select Doctor"
            dropDownContainer={[
              styles.dropDown,
              !errors.doctor && styles.hqDoctorDropDown,
            ]}
            placeholderTextStyle={styles.placeholderTextStyle}
          />
          {errors.doctor ? (
            <Text
              style={[
                styles.errorText,
                { marginBottom: theme.verticalScale(14) },
              ]}
            >
              {errors.doctor}
            </Text>
          ) : null}

          <AppDatePicker
            value={date || new Date()}
            onChange={handleDateChange}
            visible={dateVisible}
            onClose={handleDateClose}
            maximumDate={new Date()}
            minimumDate={threeDaysAgo}
          />

          <Text style={styles.label}>Visit Order</Text>
          <AppInput
            value={input.visitOrder}
            handleChange={(value) => handleChange('visitOrder', value)}
            inputBoxStyle={styles.remarkInput}
            placeholderText="Enter Visit order"
            keyboardType="numeric"
            // editable={false}
          />
          {errors.visitOrder ? (
            <Text
              style={[
                styles.errorText,
                { marginTop: theme.verticalScale(-10) },
              ]}
            >
              {errors.visitOrder}
            </Text>
          ) : null}

          <Text style={styles.label}>Remarks on Area</Text>
          <View style={styles.commentBox}>
            <TextInput
              value={input.remark}
              onChangeText={(val) => handleChange('remark', val)}
              style={[styles.commentInput, styles.remarkInputBox]}
              multiline
              placeholder="Enter Remarks... "
            />
          </View>
          {errors.remark ? (
            <Text
              style={[
                styles.errorText,
                {
                  marginBottom: theme.verticalScale(0),
                },
              ]}
            >
              {errors.remark}
            </Text>
          ) : null}

          <Text style={[styles.label, styles.commentText]}>Comments</Text>
          <View style={styles.commentBox}>
            <TextInput
              value={input.comment}
              onChangeText={(val) => handleChange('comment', val)}
              style={styles.commentInput}
              multiline
              placeholder="Enter comment..."
            />
          </View>
          {errors.comment ? (
            <Text
              style={[
                styles.errorText,
                { marginBottom: theme.verticalScale(0) },
              ]}
            >
              {errors.comment}
            </Text>
          ) : null}

          <CustomButton
            title="Submit Report"
            style={styles.submitReportBtn}
            textStyle={styles.textStyle}
            onPress={handleReportSubmit}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ReportScreen;
