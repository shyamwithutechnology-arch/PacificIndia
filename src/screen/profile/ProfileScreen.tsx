import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import {
  AppHeader,
  AppInput,
  CustomDropDown,
  CustomButton,
  ScreenLayout,
  Loader,
} from '../../component';
import { Icons } from '../../assets/icons';
import { createStyles } from './styles';
import { Images } from '../../assets/images';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import AppImagePicker from '../../component/appImagePicker/AppImagePicker';
import { showToast } from '../../utils/toast';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { localStorage, storageKeys } from '../../storage/storage';

const ProfileScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [single, setSingle] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userData, setuserData] = useState({});
  const [stateList, setStateList] = useState([]);
  const [memberId, setMemberId] = useState('');
  const isTablet = theme.isTablet;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Alert.alert('stateList', JSON.stringify(stateList));

  const [cityList, setCityList] = useState([]);
  // Alert.alert('userData', JSON.stringify(userData));
  // const [input, setInput] = useState({
  //   name: '',
  //   fatherName: '',
  //   motherName: '',
  //   mobileNumber: '',
  //   email: '',
  //   maritalStatus: '',
  //   locality: '',
  //   address: '',
  //   state: '',
  //   city: '',
  // });
  const [input, setInput] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
    locality: '',
    address: '',
  });
  // const [errors, setErrors] = useState({
  //   name: '',
  //   fatherName: '',
  //   motherName: '',
  //   mobileNumber: '',
  //   email: '',
  //   maritalStatus: '',
  //   locality: '',
  //   address: '',
  //   state: '',
  //   city: '',
  // });

  const [errors, setErrors] = useState({
    image: '',
    name: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    email: '',
    locality: '',
    address: '',
    state: '',
    city: '',
    maritalStatus: '',
  });
  console.log('errr', errors);

  const validateForm = () => {
    const newErrors: any = {};

    if (!image?.uri) {
      newErrors.image = 'Please upload profile image';
    }

    if (!input.name.trim()) {
      newErrors.name = 'Please enter name';
    }

    if (!input.fatherName.trim()) {
      newErrors.fatherName = 'Please enter father name';
    }

    if (!input.motherName.trim()) {
      newErrors.motherName = 'Please enter mother name';
    }

    if (!input.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter mobile number';
    } else if (!/^\d{10}$/.test(input.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter valid mobile number';
    }

    if (!input.email.trim()) {
      newErrors.email = 'Please enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email)) {
      newErrors.email = 'Please enter valid email';
    }

    if (!input.locality.trim()) {
      newErrors.locality = 'Please enter locality';
    }

    if (!input.address.trim()) {
      newErrors.address = 'Please enter address';
    }

    if (!single) {
      newErrors.maritalStatus = 'Please select marital status';
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

  const handleGoback = useCallback(() => {
    navigation.navigate('HomeTab', { screen: 'Home' });
  }, [navigation]);

  const handleState = async (val) => {
    setState(val);
    await cityListApi(val);
  };
  const handleCity = (val) => {
    if (!state) {
      showToast('error', 'Error', 'Please select state first');
      return;
    }

    setCity(val);

    setErrors((prev) => ({
      ...prev,
      city: '',
    }));
  };
  const handleMaritalSelect = (val) => {
    setSingle(val);
    setErrors((pre) => ({ ...pre, maritalStatus: '' }));
  };
  const handleImgChange = (img) => {
    setImage(img);
    setErrors((pre) => ({ ...pre, image: '' }));
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

  const handleUpdateProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const params = {
        member_id: memberId,
        member_name: input?.name,
        member_address: input?.address,
        member_locality: input?.locality,
        member_city_id: city,
        member_state_id: state,
        member_father_name: input.fatherName,
        member_mother_name: input?.motherName,
        member_phone_optional: input.mobileNumber,
        member_marital: single !== 1 ? 'Married' : 'Single',
        member_image: image?.uri
          ? {
              uri: image.uri,
              type: image.type || 'image/jpeg',
              name: image.fileName || 'profile.jpg',
            }
          : '',
      };
      // console.log('params =>', params);
      const res = await POST_FORM(ApiEndPoint.updateProfile, params);
      // console.log('response=>', res);

      if (res?.status === '1') {
        // setuserData(res?.result[0]);
        showToast('success', 'Success', res?.msg);
        fetchUserData(res?.result[0]?.member_id);
      } else {
        showToast('error', 'Errpr', res?.msg);
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

  useEffect(() => {
    const get_member_id = async () => {
      const member_id = await localStorage.getItem(storageKeys.member_id);
      if (member_id) {
        fetchUserData(member_id);
        setMemberId(member_id);
      }

      stateListApi();
    };
    get_member_id();
  }, []);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!Object.keys(userData).length) return;

      setInput({
        name: userData?.member_name || '',
        fatherName: userData?.member_father_name || '',
        motherName: userData?.member_mother_name || '',
        mobileNumber: userData?.member_phone || '',
        email: userData?.member_email || '',
        maritalStatus: userData?.member_marital_status || '',
        locality: userData?.member_locality || '',
        address: userData?.member_address || '',
      });

      if (userData?.member_state_id) {
        setState(userData?.member_state_id);

        // Load city list first
        await cityListApi(userData.member_state_id);

        // Then set selected city
        setCity(userData.member_city_id);
      }

      if (userData?.member_marital_status) {
        setSingle(userData?.member_marital_status === 'Unmarried' ? 1 : 2);
      }
      // setInput({
      //   name: userData?.member_name || '',
      //   fatherName: userData?.member_father_name || '',
      //   motherName: userData?.member_mother_name || '',
      //   mobileNumber: userData?.member_phone || '',
      //   email: userData?.member_email || '',
      //   maritalStatus: userData?.member_marital_status || '',
      //   address: userData?.member_address || '',
      // });
    };
    loadProfileData();
  }, [userData]);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Profile"
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
        <Text style={[styles.nameError, styles.profileImgError]}>
          {errors.image}
        </Text>
      ) : undefined}

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
          <Text style={[styles.addressText1, styles.cityText]}>Name </Text>
          <AppInput
            placeholderText={'Please enter name'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.name}
            handleChange={(value) => handleChange('name', value)}
          />
          {errors.name ? (
            <Text style={styles.nameError}>{errors.name}</Text>
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
          <Text style={[styles.addressText1, styles.cityText]}>
            Fathe Name{' '}
          </Text>
          <AppInput
            placeholderText={'Please enter father name'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.fatherName}
            handleChange={(value) => handleChange('fatherName', value)}
          />
          {errors.fatherName ? (
            <Text style={styles.nameError}>{errors.fatherName}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
      </View>

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
          <Text style={[styles.addressText1, styles.cityText]}>
            Mother Name{' '}
          </Text>
          <AppInput
            placeholderText={'Please enter mother name'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.motherName}
            handleChange={(value) => handleChange('motherName', value)}
          />
          {errors.motherName ? (
            <Text style={styles.nameError}>{errors.motherName}</Text>
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
          <Text style={[styles.addressText1, styles.cityText]}>
            Mobile Number{' '}
          </Text>
          <AppInput
            placeholderText={'Please enter mobile number'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.mobileNumber}
            handleChange={(value) => handleChange('mobileNumber', value)}
          />
          {errors.mobileNumber ? (
            <Text style={styles.nameError}>{errors.mobileNumber}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
      </View>

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
          <Text style={[styles.addressText1, styles.cityText]}>Email </Text>
          <AppInput
            placeholderText={'Please enter email'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.email}
            handleChange={(value) => handleChange('email', value)}
          />
          {errors.email ? (
            <Text style={styles.nameError}>{errors.email}</Text>
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
          <Text style={[styles.addressText1, styles.cityText]}>Locality </Text>
          <AppInput
            placeholderText={'Please enter locality'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.locality}
            handleChange={(value) => handleChange('locality', value)}
          />
          {errors.locality ? (
            <Text style={styles.nameError}>{errors.locality}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
      </View>

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
          <Text style={[styles.addressText1, styles.cityText]}>Address </Text>
          <AppInput
            placeholderText={'Please enter address'}
            leftIconStyle={styles.passIcon}
            inputBoxStyle={styles.inputBoxStyle}
            value={input.address}
            handleChange={(value) => handleChange('address', value)}
          />
          {errors.address ? (
            <Text style={styles.nameError}>{errors.address}</Text>
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
        <View
          style={
            isTablet
              ? styles.halfField
              : isLandscape
              ? styles.halfField
              : undefined
          }
        >
          <Text style={[styles.addressText1, styles.cityText]}>
            Marital Status
          </Text>

          <View style={[styles.maritalStatusRow, styles.maritalBoxMain]}>
            <Pressable
              style={[styles.maritalStatusRow, single === 1 && styles.outerBox]}
              onPress={() => handleMaritalSelect(1)}
            >
              <View style={[styles.radioBtn, single === 1 && styles.outerBox]}>
                {single === 1 && <View style={styles.innerRadioBtn} />}
              </View>

              <Text style={styles.addressText}> Single </Text>
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

              <Text style={styles.addressText}> Marrized </Text>
            </Pressable>
          </View>
          {errors.maritalStatus ? (
            <Text style={styles.nameError}>{errors.maritalStatus}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
      </View>

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
          <Text style={styles.addressText1}>State </Text>

          <CustomDropDown
            data={stateList}
            onChange={handleState}
            value={state}
            placeholder={'Select State'}
            dropDownContainer={styles.stateDropDown}
          />
          {errors.state ? (
            <Text style={styles.nameError}>{errors.state}</Text>
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
          <Text style={[styles.addressText1]}>City </Text>
          <CustomDropDown
            data={cityList}
            onChange={handleCity}
            value={city}
            placeholder={'Select City'}
            dropDownContainer={[styles.stateDropDown, styles.cityDropDown]}
          />
          {errors.city ? (
            <Text style={styles.nameError}>{errors.city}</Text>
          ) : (
            <View style={styles.bottomSpace} />
          )}
        </View>
      </View>
      <CustomButton
        title="Submit"
        style={styles.btnStyle}
        onPress={handleUpdateProfile}
      />
      <AppImagePicker
        visible={visible}
        onChange={handleImgChange}
        onClose={handleImgClose}
      />
    </ScreenLayout>
  );
};

export default ProfileScreen;
