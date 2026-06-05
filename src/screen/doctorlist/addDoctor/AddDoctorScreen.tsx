import { View, Text, Pressable, FlatList, Image, Alert } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import {
  AppHeader,
  AppInput,
  CustomDropDown,
  CustomButton,
  ScreenLayout,
  Loader,
} from '../../../component';
import { Icons } from '../../../assets/icons';
import { createStyles } from './styles';
import { Images } from '../../../assets/images';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import AppImagePicker from '../../../component/appImagePicker/AppImagePicker';
import { showToast } from '../../../utils/toast';
import { GET, POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { localStorage, storageKeys } from '../../../storage/storage';
import AppDatePicker from '../../../component/appDatePicker/AppDatePicker';
import { formatDateDDMMYYYY } from '../../../utils/date';

const AddDoctorScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [single, setSingle] = useState('');
  const [state, setState] = useState('');
  const [selectedSpecility, setSelectedSpecility] = useState('');
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');
  const [userData, setuserData] = useState({});
  const [speciality, setSpeciality] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const formatedDate = formatDateDDMMYYYY(date);

  const [input, setInput] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
    address: '',
    locality: '',
    state: '',
    city: '',
    hospitalName: '',
  });

  const [errors, setErrors] = useState({
    // name: '',
    // fatherName: '',
    // motherName: '',
    // mobileNumber: '',
    // email: '',
    // maritalStatus: '',
    // address: '',
    // state: '',
    // city: '',
    // hospitalName: '',
    name: '',
    mobileNumber: '',
    email: '',
    hospitalName: '',
    address: '',
    locality: '',
    maritalStatus: '',
    surgeon: '',
    state: '',
    city: '',
    image: '',
  });

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleState = async (val) => {
    setState(val);
    setErrors((prev) => ({ ...prev, state: '' }));
    await cityListApi(val);
  };
  const handleSpecility = async (val) => {
    setSelectedSpecility(val);
    setErrors((prev) => ({ ...prev, surgeon: '' }));
  };
  const handleVisibleDate = () => {
    setDateVisible(true);
  };

  const handleDateClose = () => {
    setDateVisible(false);
  };

  const handleCity = (val) => {
    if (!state) {
      showToast('error', 'Error', 'Please select state first');
    } else {
      setErrors((prev) => ({ ...prev, city: '' }));
      setCity(val);
    }
  };
  const handleMaritalSelect = (val) => {
    setSingle(val);
    setErrors((prev) => ({ ...prev, maritalStatus: '' }));
  };
  const handleImgChange = (img) => {
    setImage(img);
    setErrors((prev) => ({ ...prev, image: '' }));
  };
  const handleImgClose = () => {
    setVisible(false);
  };
  const handleImgOpen = () => {
    setVisible(true);
  };

  const handleChange = (key: string, value: any) => {
    setInput((pre) => ({ ...pre, [key]: value }));
    setErrors((pre) => ({ ...pre, [key]: '' }));
  };

  const fetchUserData = async (member_id) => {
    setLoading(true);
    try {
      const params = {
        member_id: member_id,
      };
      const res = await POST_FORM(ApiEndPoint.getProfile, params);
      if (res?.status === '1') {
        setuserData(res?.result[0]);
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
  // console.log('image', image);
  // Alert.alert('image', JSON.stringify(image));

  const validateForm = () => {
    const newErrors = {};

    if (!input.name?.trim()) {
      newErrors.name = 'Please enter doctor name';
    }

    if (!input.mobileNumber?.trim()) {
      newErrors.mobileNumber = 'Please enter mobile number';
    } else if (!/^\d{10}$/.test(input.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter valid mobile number';
    }

    if (!input.email?.trim()) {
      newErrors.email = 'Please enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email)) {
      newErrors.email = 'Please enter valid email';
    }

    if (!input.hospitalName?.trim()) {
      newErrors.hospitalName = 'Please enter hospital name';
    }

    if (!input.address?.trim()) {
      newErrors.address = 'Please enter address';
    }
    if (!input.locality?.trim()) {
      newErrors.locality = 'Please enter locality';
    }

    if (!single) {
      newErrors.maritalStatus = 'Please select marital status';
    }

    if (!selectedSpecility) {
      newErrors.speciality = 'Please select surgeon';
    }

    if (!state) {
      newErrors.state = 'Please select state';
    }

    if (!city) {
      newErrors.city = 'Please select city';
    }

    if (!image?.uri) {
      newErrors.image = 'Please upload hospital image';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addDoctor = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    setLoading(true);
    try {
      const params = {
        member_id: memberId,
        dr_speciality_id: selectedSpecility,
        dr_state_id: state,
        dr_city_id: city,
        dr_locality: input?.locality,
        dr_name: input?.name,
        dr_address: input?.address,
        dr_email: input?.email,
        dr_phone: input?.mobileNumber,
        dr_marital: single !== 1 ? 'Married' : 'Single',
        dr_dob: formatDateDDMMYYYY(date),
        dr_hospital_image: {
          uri: image?.uri,
          type: image?.type || 'image/jpeg',
          name: image?.fileName || 'hospital.jpg',
        },
        dr_hospital_name: input?.hospitalName,
      };

      console.log('params', params);
      const res = await POST_FORM(ApiEndPoint.addDoctor, params);

      if (res?.status === '1') {
        showToast('success', 'Success', res?.msg || 'Doctor Add Successfully');
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
      // Alert.alert('resssssssssssssssss', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const stateListApi = async () => {
    try {
      setLoading(true);
      const res = await GET(ApiEndPoint.stateList);
      if (res?.status === '1') {
        const formattedStates = res.result.map((item) => ({
          label: item.state_name,
          value: item.state_id,
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
          value: item.city_id,
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

  const specialityList = async () => {
    try {
      setLoading(true);
      const response = await GET(ApiEndPoint.listSpeciality);
      if (response?.status === '1') {
        // setSpeciality(response?.result || []);
        const formatedData = response?.result?.map((item) => ({
          label: item?.ms_name,
          value: item?.ms_id,
        }));
        setSpeciality(formatedData || []);
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

  useEffect(() => {
    const get_member_id = async () => {
      const member_id = await localStorage.getItem(storageKeys.member_id);
      if (member_id) {
        setMemberId(member_id);
        fetchUserData(member_id);
      }

      stateListApi();
      specialityList();
    };
    get_member_id();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Add Doctor"
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
      scroll={true}
      innerContainer={styles.innerContainer}
    >
      <Loader visible={loading} />

      <Pressable style={styles.logoBox} onPress={handleImgOpen}>
        {image?.uri ? (
          <Image
            source={{ uri: image?.uri }}
            style={styles.splashLogo}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={Images.logo}
            style={styles.splashLogo}
            resizeMode="contain"
          />
        )}

        <View style={styles.editProfileBtn}>
          <EditIcon
            name="mode-edit-outline"
            color="#fff"
            size={theme.moderateScale(18)}
          />
        </View>
      </Pressable>
      {errors.image ? (
        <Text style={[styles.nameError, styles.imageUpload]}>
          {errors.image}
        </Text>
      ) : null}
      <View>
        <Text style={styles.addressText1}>Name </Text>
        <AppInput
          placeholderText={'Please enter name'}
          leftIconStyle={styles.passIcon}
          leftIcon={Icons.userProfileIcon}
          inputBoxStyle={styles.inputBoxStyle}
          leftIcontintColor={theme.tokens.colors.primary}
          handleChange={(value) => handleChange('name', value)}
        />
        {errors.name ? (
          <Text style={styles.nameError}>{errors.name}</Text>
        ) : (
          <View style={styles.bottomSpace} />
        )}
      </View>

      <Text style={styles.addressText1}>Mobile Number </Text>
      <AppInput
        placeholderText={'Please enter mobile number'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.mobileNumber}
        leftIcon={Icons.callIcon}
        leftIcontintColor={theme.tokens.colors.primary}
        handleChange={(value) => handleChange('mobileNumber', value)}
        keyboardType={'number-pad'}
        maxLength={10}
      />

      {errors.mobileNumber ? (
        <Text style={styles.nameError}>{errors.mobileNumber}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}

      <Text style={styles.addressText1}>Email </Text>
      <AppInput
        placeholderText={'Please enter email'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.email}
        leftIcon={Icons.emailOutlineIcon}
        handleChange={(value) => handleChange('email', value)}
        keyboardType={'email-address'}
      />
      {errors.email ? (
        <Text style={styles.nameError}>{errors.email}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}
      {
        // <AppInput
        //   placeholderText={'Please enter marital status'}
        //   leftIconStyle={styles.passIcon}
        //   inputBoxStyle={styles.inputBoxStyle}
        //   handleChange={(value) => handleChange('maritalStatus', value)}
        // />
      }
      {
        // <AppInput
        //   placeholderText={'Please enter address'}
        //   leftIconStyle={styles.passIcon}
        //   inputBoxStyle={styles.inputBoxStyle}
        //   handleChange={(value) => handleChange('address', value)}
        // />
        // <AppInput
        //   placeholderText={'Please enter state'}
        //   leftIconStyle={styles.passIcon}
        //   inputBoxStyle={styles.inputBoxStyle}
        //   handleChange={(value) => handleChange('state', value)}
        // />
        // <AppInput
        //   placeholderText={'Please enter city'}
        //   leftIconStyle={styles.passIcon}
        //   inputBoxStyle={styles.inputBoxStyle}
        //   handleChange={(value) => handleChange('city', value)}
        // />
      }
      <Text style={styles.addressText1}>Date of Birth </Text>
      <Pressable style={styles.dateSelectBox} onPress={handleVisibleDate}>
        <Image
          source={Icons.dateIcon}
          style={styles.dateIcon}
          tintColor={theme.tokens.colors.primary}
        />
        <Text style={styles.selectDate}> {formatedDate}</Text>
      </Pressable>

      <AppDatePicker
        value={date}
        onChange={setDate}
        visible={dateVisible}
        onClose={handleDateClose}
      />

      <Text style={styles.addressText1}>Hospital Name </Text>
      <AppInput
        placeholderText={'Please enter Hospital name'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.hospitalName}
        leftIcontintColor={theme.tokens.colors.primary}
        leftIcon={Icons.hospitalIcon}
        handleChange={(value) => handleChange('hospitalName', value)}
      />
      {errors.hospitalName ? (
        <Text style={styles.nameError}>{errors.hospitalName}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}

      <Text style={styles.addressText1}>Locality </Text>
      <AppInput
        placeholderText={'Please enter locality'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.locality}
        leftIcontintColor={theme.tokens.colors.primary}
        leftIcon={Icons.mapIcon}
        handleChange={(value) => handleChange('locality', value)}
      />
      {errors.locality ? (
        <Text style={styles.nameError}>{errors.locality}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}

      <Text style={styles.addressText1}>Address </Text>
      <AppInput
        placeholderText={'Please enter address'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.address}
        leftIcontintColor={theme.tokens.colors.primary}
        leftIcon={Icons.mapIcon}
        handleChange={(value) => handleChange('address', value)}
      />
      {errors.address ? (
        <Text style={styles.nameError}>{errors.address}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}

      <Text style={styles.addressText1}>Marital Status </Text>

      <View style={[styles.maritalStatusRow, styles.maritalBoxMain]}>
        <Pressable
          style={[styles.maritalStatusRow, single === 1 && styles.outerBox]}
          onPress={() => handleMaritalSelect(1)}
        >
          <View style={[styles.radioBtn, single === 1 && styles.outerBox]}>
            {single === 1 && <View style={styles.innerRadioBtn} />}
          </View>

          <Text
            style={[styles.addressText, single === 1 && styles.singleSelected]}
          >
            {' '}
            Single{' '}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.maritalStatusRow,
            styles.marrizedStyle,
            single === 2 && styles.outerBox,
          ]}
          onPress={() => handleMaritalSelect(2)}
        >
          <View style={[styles.radioBtn, single === 2 && styles.outerBox]}>
            {single === 2 && <View style={styles.innerRadioBtn} />}
          </View>

          <Text
            style={[styles.addressText, single === 2 && styles.singleSelected]}
          >
            {' '}
            Married{' '}
          </Text>
        </Pressable>
      </View>
      {errors.maritalStatus ? (
        <Text style={styles.nameError}>{errors.maritalStatus}</Text>
      ) : (
        <View style={styles.bottomSpace} />
      )}

      <Text style={styles.addressText1}>General Surgeon </Text>
      <CustomDropDown
        data={speciality}
        onChange={handleSpecility}
        value={selectedSpecility}
        placeholder={'Select surgeon'}
        dropDownContainer={styles.stateDropDown}
      />
      {errors.surgeon ? (
        <Text style={styles.nameError}>{errors.surgeon}</Text>
      ) : undefined}
      <Text style={[styles.addressText1, styles.stateText]}>State </Text>
      <CustomDropDown
        data={stateList}
        onChange={handleState}
        value={state}
        placeholder={'Select State'}
        dropDownContainer={styles.stateDropDown}
      />
      {errors.state ? (
        <Text style={styles.nameError}>{errors.state}</Text>
      ) : undefined}
      <Text style={[styles.addressText1, !errors.state && styles.cityText]}>
        City{' '}
      </Text>

      <CustomDropDown
        data={cityList}
        onChange={handleCity}
        value={city}
        placeholder={'Select City'}
        dropDownContainer={[styles.stateDropDown, styles.cityDropDown]}
        dropdownPosition={'top'}
      />
      {errors.city ? (
        <Text style={styles.nameError}>{errors.city}</Text>
      ) : undefined}
      <CustomButton
        title="Submit"
        style={styles.btnStyle}
        onPress={addDoctor}
      />

      <AppImagePicker
        visible={visible}
        onChange={handleImgChange}
        onClose={handleImgClose}
      />
    </ScreenLayout>
  );
};

export default AddDoctorScreen;
