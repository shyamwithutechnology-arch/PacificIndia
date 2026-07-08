import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
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
import {
  formatDateDayMonthShortYear,
  formatDateDDMMYYYY,
} from '../../../utils/date';
import { useRoute } from '@react-navigation/native';

const AddDoctorScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const isTablet = theme.isTablet;
  // Alert.alert('isTablet', JSON.stringify(isTablet));
  // const { title, doctorId } = route?.params;
  const { title = 'Add Doctor', doctorId = '' } = route?.params || {};

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  // Alert.alert('image', );
  const [memberId, setMemberId] = useState(null);
  const [single, setSingle] = useState('');
  const [state, setState] = useState('');
  const [selectedSpecility, setSelectedSpecility] = useState('');
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [userData, setuserData] = useState({});
  const [speciality, setSpeciality] = useState([]);
  console.log('speciality', speciality);

  const [doctorDetails, setDoctorDetails] = useState({});
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const formatedDate = formatDateDayMonthShortYear(date);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [input, setInput] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
    address: '',
    hospitalName: '',
  });
  // Alert.alert('name', JSON.stringify(input?.name));

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
    speciality: '',
    address: '',
    town: '',
    maritalStatus: '',
    state: '',
    city: '',
  });
  console.log('eraa', errors);

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
    setErrors((prev) => ({ ...prev, segment: '' }));
  };

  const handleVisibleDate = () => {
    setDateVisible(true);
  };

  const handleDateClose = () => {
    setDateVisible(false);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    setErrors((prev) => ({
      ...prev,
      date: '',
    }));
  };

  const handleCity = async (val) => {
    if (!state) {
      showToast('error', 'Error', 'Please select state first');
    } else {
      setErrors((prev) => ({ ...prev, city: '' }));
      setCity(val);
      await townListApi(val);
    }
  };

  const handleTown = (val) => {
    setTown(val);
    setErrors((prev) => ({ ...prev, town: '' }));
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
    if (key === 'mobileNumber') {
      value = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
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
      newErrors.name = 'Please enter name';
    }

    if (!input.speciality?.trim()) {
      newErrors.speciality = 'Please enter speciality';
    }

    if (!input.mobileNumber?.trim()) {
      newErrors.mobileNumber = 'Please enter number';
    } else if (!/^\d{10}$/.test(input.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter valid  number';
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

    if (!single) {
      newErrors.maritalStatus = 'Please select marital status';
    }

    if (!selectedSpecility) {
      newErrors.segment = 'Please select segment';
    }

    if (!state) {
      newErrors.state = 'Please select state';
    }

    if (!city) {
      newErrors.city = 'Please select city';
    }

    if (!town) {
      newErrors.town = 'Please select town';
    }

    if (!image || (typeof image === 'object' && !image?.uri)) {
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
        dr_locality: town,
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

      const res = await POST_FORM(ApiEndPoint.addDoctor, params);
      if (res?.status === '1') {
        showToast('success', 'Success', res?.msg || 'Doctor Add Successfully');
        navigation.navigate('Doctorlist');
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

  const updateDoctor = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);
    try {
      const params = {
        dr_id: doctorId,
        dr_name: input?.name,
        dr_specality: input?.speciality,
        dr_locality: town,
        dr_phone: input?.mobileNumber,
        dr_email: input?.email,
        dr_speciality_id: speciality,
        dr_dob: date,
        dr_marital: single !== 1 ? 'Married' : 'Single',
        dr_address: input?.address,
        state_id: state,
        city_id: city,
        dr_himage: {
          uri: image?.uri,
          type: image?.type || 'image/jpeg',
          name: image?.fileName || 'hospital.jpg',
        },
      };
      const res = await POST_FORM(ApiEndPoint.updateDoctor, params);

      if (res?.status === '1') {
        showToast('success', 'Success', res?.msg || 'Doctor Edit Successfully');
        navigation.navigate('Doctorlist');
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

  const townListApi = async (id) => {
    try {
      setLoading(true);
      const res = await POST_FORM(`${ApiEndPoint.listTown}`, {
        city_id: id,
      });
      if (res?.status === '1') {
        const formattedTown = res.result.map((item) => ({
          label: item.tw_name,
          value: item.tw_id,
        }));
        setTownList(formattedTown);
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

  const fetchDoctorDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.detailsDoctor, {
        dr_id: id,
      });
      if (response?.status === '1') {
        setDoctorDetails(response?.result[0] || []);
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

  useEffect(() => {
    const getId = async () => {
      if (doctorId) {
        fetchDoctorDetails(doctorId);
      }
    };
    getId();
  }, [doctorId]);

  useEffect(() => {
    const setDoctorData = async () => {
      if (!doctorDetails) return;

      setInput({
        name: doctorDetails?.dr_name || '',
        mobileNumber: doctorDetails?.dr_phone || '',
        email: doctorDetails?.dr_email || '',
        maritalStatus: '',
        address: doctorDetails?.dr_address,
        hospitalName: doctorDetails?.dr_hospital_name || '',
      });

      if (doctorDetails?.dr_dob) {
        const [day, month, year] = doctorDetails?.dr_dob.split('-');
        setDate(new Date(year, month - 1, day));
      }
      if (doctorDetails?.dr_state_id) {
        handleState(doctorDetails?.dr_state_id);
      }
      if (doctorDetails?.dr_city_id) {
        setCity(doctorDetails?.dr_city_id);

        // Load towns for this city
        await townListApi(doctorDetails.dr_city_id);
      }
      if (doctorDetails?.dr_locality) {
        setTown(doctorDetails?.dr_locality);
      }

      if (doctorDetails?.dr_image) {
        setImage(doctorDetails?.dr_image);
      }

      if (doctorDetails?.dr_marital) {
        setSingle(doctorDetails?.dr_marital === 'married' ? 2 : 1);
      }
      if (doctorDetails?.dr_speciality_id) {
        setSelectedSpecility(doctorDetails?.dr_speciality_id);
      }
    };
    setDoctorData();
  }, [doctorDetails]);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title={title}
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
      scroll={true}
      innerContainer={styles.innerContainer}
    >
      <Loader visible={loading} />

      <Pressable style={styles.logoBox} onPress={handleImgOpen}>
        {
          // {image ? (
        }
        <Image
          source={
            image
              ? { uri: typeof image === 'string' ? image : image.uri }
              : Images.logo
          }
          style={styles.splashLogo}
          borderRadius={theme.tokens.radius.xxl}
          resizeMode="contain"
        />
        {
          // ) : (
          //   <Image
          //     source={Images.logo}
          //     style={styles.splashLogo}
          //     resizeMode="contain"
          //   />
          // )}
        }

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

      <View
        style={
          isTablet ? styles.formRow : isLandscape ? styles.formRow : undefined
        }
      >
        <View
          style={
            isTablet
              ? styles.halfField
              : isLandscape
              ? styles.halfField
              : undefined
          }
        >
          <Text style={styles.addressText1}>Name </Text>
          <AppInput
            placeholderText={'Please enter name'}
            leftIconStyle={styles.passIcon}
            leftIcon={Icons.userProfileIcon}
            inputBoxStyle={styles.inputBoxStyle}
            leftIcontintColor={theme.tokens.colors.primary}
            value={input.name}
            handleChange={(value) => handleChange('name', value)}
          />
          {errors.name ? (
            <Text style={styles.nameError}>{errors.name}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
        <Text style={styles.addressText1}>Speciality </Text>
        <AppInput
          placeholderText={'Please enter speciality'}
          leftIconStyle={styles.passIcon}
          leftIcon={Icons.userProfileIcon}
          inputBoxStyle={styles.inputBoxStyle}
          leftIcontintColor={theme.tokens.colors.primary}
          value={input.speciality}
          handleChange={(value) => handleChange('speciality', value)}
        />
        {errors.speciality ? (
          <Text style={styles.nameError}>{errors.speciality}</Text>
        ) : (
          <View style={styles.bottomSpace} />
        )}
      </View>

      <View
        style={
          isTablet
            ? styles.halfField
            : isLandscape
            ? styles.halfField
            : undefined
        }
      >
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
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
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
        </View>
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
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.addressText1}>Date of Birth </Text>
          <Pressable style={styles.dateSelectBox} onPress={handleVisibleDate}>
            <Image
              source={Icons.dateIcon}
              style={styles.dateIcon}
              tintColor={theme.tokens.colors.primary}
            />
            <Text style={styles.selectDate}>
              {' '}
              {date ? formatedDate : 'Select Date'}
            </Text>
          </Pressable>

          <AppDatePicker
            value={date || new Date()}
            onChange={handleDateChange}
            visible={dateVisible}
            onClose={handleDateClose}
            minimumDate={new Date('1900-01-01')}
            maximumDate={new Date()}
          />
        </View>
      </View>

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.addressText1}>Hospital Name</Text>
          <AppInput
            placeholderText="Please enter Hospital name"
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
        </View>
      </View>

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

      <View style={isTablet ? styles.formRow : undefined}>
        <View style={isTablet ? styles.halfField : undefined}>
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
                style={[
                  styles.addressText,
                  single === 1 && styles.singleSelected,
                ]}
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
                style={[
                  styles.addressText,
                  single === 2 && styles.singleSelected,
                ]}
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
        </View>

        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={styles.addressText1}>Select Segment </Text>
          <CustomDropDown
            data={speciality}
            onChange={handleSpecility}
            value={selectedSpecility}
            placeholder={'Select Segment'}
            dropDownContainer={styles.stateDropDown}
          />
          {errors.segment ? (
            <Text style={styles.nameError}>{errors.segment}</Text>
          ) : undefined}
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
          />
          {errors.state ? (
            <Text style={styles.nameError}>{errors.state}</Text>
          ) : undefined}
        </View>

        <View style={isTablet ? styles.halfField : undefined}>
          <Text style={[styles.addressText1, !errors.state && styles.cityText]}>
            City
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
        </View>
      </View>

      <Text style={[styles.addressText1, !errors.state && styles.cityText]}>
        Town
      </Text>

      <CustomDropDown
        data={townList}
        onChange={handleTown}
        value={town}
        placeholder={'Select Town'}
        dropDownContainer={[styles.stateDropDown, styles.cityDropDown]}
        dropdownPosition={'top'}
      />
      {errors.town ? (
        <Text style={styles.nameError}>{errors.town}</Text>
      ) : undefined}

      <CustomButton
        title="Submit"
        style={styles.btnStyle}
        onPress={() => {
          if (doctorId) {
            updateDoctor();
          } else {
            addDoctor();
          }
        }}
      />
      {
        // doctorId ?: addDoctor
      }

      <AppImagePicker
        visible={visible}
        onChange={handleImgChange}
        onClose={handleImgClose}
      />
    </ScreenLayout>
  );
};

export default AddDoctorScreen;
