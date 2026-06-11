import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { createStyles } from './styles';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomButton,
  CustomDropDown,
  Loader,
} from './../../../component';
import { Icons } from '../../../assets/icons';
import { showToast } from '../../../utils/toast';
import { GET, POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { localStorage, storageKeys } from '../../../storage/storage';
import { formatDateDayMonthShortYear } from '../../../utils/date';
import AppDatePicker from '../../../component/appDatePicker/AppDatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBackHandler from '../../../component/backhandler/AppBackHandler';

const AddAppointMentScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState('');

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userData, setuserData] = useState({});
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const formatedDate = formatDateDayMonthShortYear(date);
  console.log('time', time);

  const isTablet = theme.isTablet;

  const [input, setInput] = useState({
    name: '',
    mobile: '',
    email: '',
    hospitalName: '',
    hospitalLocality: '',
    hospitalAddress: '',
    comment: '',
    time: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    email: '',
    hospitalName: '',
    hospitalLocality: '',
    hospitalAddress: '',
    time: '',
    date: '',
    state: '',
    city: '',
  });

  const handleChange = (key: string, value: any) => {
    if (key === 'mobile') {
      value = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setInput((pre) => ({ ...pre, [key]: value }));
    setErrors((pre) => ({ ...pre, [key]: '' }));
  };

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleState = async (val) => {
    setState(val);
    setErrors((prev) => ({
      ...prev,
      state: '',
    }));
    await cityListApi(val);
  };

  const handleCity = (val) => {
    if (!state) {
      showToast('error', 'Error', 'Please select state first');
    } else {
      setCity(val);
      setErrors((prev) => ({
        ...prev,
        city: '',
      }));
    }
  };

  const handleVisibleDate = () => {
    setDateVisible(true);
  };
  const handleShowTime = () => {
    setShow(true);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    setErrors((prev) => ({
      ...prev,
      date: '',
    }));
  };

  const handleDateClose = () => {
    setDateVisible(false);
  };

  const stateListApi = async () => {
    try {
      setLoading(true);
      const res = await GET(ApiEndPoint.stateList);
      if (res?.status === '1') {
        const formattedStates = res.result.map((item) => ({
          label: item.state_name,
          value: String(item.state_id),
        }));
        setStateList(formattedStates);
        // Alert.alert('stateList', JSON.stringify(res?.result || []));
      }
    } catch (error) {
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const cityListApi = async (stateId) => {
    try {
      setLoading(true);
      const res = await POST_FORM(`${ApiEndPoint.cityList}`, {
        state_id: stateId,
      });
      if (res?.status === '1') {
        const formattedCities = res.result.map((item) => ({
          label: item.city_name,
          value: String(item.city_id),
        }));
        setCityList(formattedCities);
      }
    } catch (error) {
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
    const newErrors: any = {};

    if (!input.name.trim()) {
      newErrors.name = 'Please enter doctor name';
    }

    if (!input.mobile.trim()) {
      newErrors.mobile = 'Please enter mobile number';
    } else if (!/^\d{10}$/.test(input.mobile)) {
      newErrors.mobile = 'Please enter valid mobile number';
    }

    if (!input.email.trim()) {
      newErrors.email = 'Please enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email)) {
      newErrors.email = 'Please enter valid email';
    }

    if (!date) {
      newErrors.date = 'Please select appointment date';
    }

    if (!input.time?.trim()) {
      newErrors.time = 'Please enter appointment time';
    }

    if (!input.hospitalName.trim()) {
      newErrors.hospitalName = 'Please enter hospital name';
    }

    if (!input.hospitalLocality.trim()) {
      newErrors.hospitalLocality = 'Please enter hospital locality';
    }

    if (!input.hospitalAddress.trim()) {
      newErrors.hospitalAddress = 'Please enter hospital address';
    }

    if (!state) {
      newErrors.state = 'Please select state';
    }

    if (!city) {
      newErrors.city = 'Please select city';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addAppointMent = async (id: string) => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.addAppointment, {
        member_id: memberId,
        doctor_name: input.name,
        doctor_mobile: input?.mobile,
        doctor_email: input.email,
        hospital_name: input.hospitalName,
        hospital_address: input.hospitalAddress,
        hospital_locality: input.hospitalLocality,
        city_id: city,
        state_id: state,
        appointment_time: input.time,
        appointment_date: date,
        appointment_comment: input.comment,
      });

      if (response?.status === '1') {
        showToast('success', 'Success', response?.msg || 'Successfully Insert');
      } else {
        showToast('error', 'Error', response?.msg || 'Faild Insert');
      }
    } catch (error) {
      console.log('errqqqqqqqqqqq', error);
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

  useEffect(() => {
    let getMemberId = async () => {
      let id = await localStorage.getItem(storageKeys.member_id);
      setMemberId(id);
      stateListApi();
    };
    getMemberId();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Add appointment"
          search={seach}
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
      scroll={true}
    >
      <AppBackHandler goBack={true} />
      <Loader visible={loading} />

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Doctor Name</Text>

          <AppInput
            inputBoxStyle={[styles.inputBoxStyle]}
            placeholderText="Please enter name"
            value={input.name}
            handleChange={(value) => handleChange('name', value)}
          />
          {errors?.name && (
            <Text style={[styles.nameError]}>{errors?.name}</Text>
          )}
        </View>

        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Doctor Mobile Number</Text>
          <AppInput
            inputBoxStyle={styles.inputBoxStyle}
            placeholderText="Please enter doctor mobile number"
            value={input.mobile}
            handleChange={(value) => handleChange('mobile', value)}
            keyboardType="numeric"
          />
          {errors?.mobile && (
            <Text style={[styles.nameError]}>{errors?.mobile}</Text>
          )}
        </View>
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Doctor Email</Text>
          <AppInput
            inputBoxStyle={styles.inputBoxStyle}
            placeholderText="Please enter email"
            value={input.email}
            handleChange={(value) => handleChange('email', value)}
            keyboardType="email-address"
          />
          {errors?.email && (
            <Text style={[styles.nameError]}>{errors?.email}</Text>
          )}
        </View>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Appointment Date</Text>
          <Pressable style={styles.dateSelectBox} onPress={handleVisibleDate}>
            {
              // <Image
              //   source={Icons.dateIcon}
              //   style={styles.dateIcon}
              //   tintColor={theme.tokens.colors.primary}
              // />
            }
            <Text style={styles.selectDate}>
              {' '}
              {date ? formatedDate : 'Select Date'}
            </Text>
          </Pressable>

          {errors?.date && (
            <Text style={[styles.nameError]}>{errors?.date}</Text>
          )}
          <AppDatePicker
            value={date || new Date()}
            onChange={handleDateChange}
            visible={dateVisible}
            onClose={handleDateClose}
          />
        </View>
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={[styles.doctorName]}>Appointment Time</Text>
          <Pressable onPress={handleShowTime}>
            <AppInput
              inputBoxStyle={styles.inputBoxStyle}
              placeholderText="Please enter appointment time "
              value={input.time}
              editable={false}
            />
          </Pressable>
          {errors?.time && (
            <Text style={[styles.nameError]}>{errors?.time}</Text>
          )}
        </View>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Hospital Name</Text>
          <AppInput
            inputBoxStyle={styles.inputBoxStyle}
            placeholderText="Please enter hospital name"
            value={input.hospitalName}
            handleChange={(value) => handleChange('hospitalName', value)}
          />
          {errors?.hospitalName && (
            <Text style={[styles.nameError]}>{errors?.hospitalName}</Text>
          )}
        </View>
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Hospital locality</Text>
          <AppInput
            inputBoxStyle={styles.inputBoxStyle}
            placeholderText="Please enter hospital locality"
            value={input.hospitalLocality}
            handleChange={(value) => handleChange('hospitalLocality', value)}
          />
          {errors?.hospitalLocality && (
            <Text style={[styles.nameError]}>{errors?.hospitalLocality}</Text>
          )}
        </View>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.doctorName}>Hospital address</Text>
          <AppInput
            inputBoxStyle={styles.inputBoxStyle}
            placeholderText="Please enter hospital address"
            value={input.hospitalAddress}
            handleChange={(value) => handleChange('hospitalAddress', value)}
          />
          {errors?.hospitalAddress && (
            <Text style={[styles.nameError]}>{errors?.hospitalAddress}</Text>
          )}
        </View>
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={[styles.addressText1, styles.stateText]}>State </Text>

          <CustomDropDown
            data={stateList}
            onChange={handleState}
            value={state}
            placeholder={'Select State'}
            dropDownContainer={styles.stateDropDown}
            placeholderTextStyle={styles.cityPlaceholderText}
          />
          {errors?.state && (
            <Text style={[styles.nameError]}>{errors?.state}</Text>
          )}
        </View>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={[styles.addressText1, styles.cityText]}>City </Text>
          <CustomDropDown
            data={cityList}
            onChange={handleCity}
            value={city}
            placeholder={'Select City'}
            placeholderTextStyle={styles.cityPlaceholderText}
            dropDownContainer={[styles.stateDropDown, styles.cityDropDown]}
          />
          {errors?.city && (
            <Text style={[styles.nameError]}>{errors?.city}</Text>
          )}
        </View>
      </View>
      <CustomButton
        title="Submit"
        onPress={addAppointMent}
        style={styles.submitBtn}
      />

      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              setTime(selectedDate);

              const formattedTime = selectedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });

              handleChange('time', formattedTime);
            }
          }}
        />
      )}
    </ScreenLayout>
  );
};

export default AddAppointMentScreen;
