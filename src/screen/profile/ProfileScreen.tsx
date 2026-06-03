import { View, Text, Pressable, FlatList, Image, Alert } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
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
  console.log('stateqqqq', JSON.stringify(state));

  const [city, setCity] = useState('');
  const [userData, setuserData] = useState({});
  const [stateList, setStateList] = useState([]);
  console.log('stateqqqqqq', JSON.stringify(stateList));
  // Alert.alert('stateList', JSON.stringify(stateList));

  const [cityList, setCityList] = useState([]);
  // Alert.alert('userData', JSON.stringify(userData));
  const [input, setInput] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
    address: '',
    state: '',
    city: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
    address: '',
    state: '',
    city: '',
  });

  // const stateList = [
  //   { label: 'Rajasthan', value: 'Rajasthan' },
  //   { label: 'Delhi', value: 'Delhi' },
  //   { label: 'Gujarat', value: 'Gujarat' },
  //   { label: 'Maharashtra', value: 'Maharashtra' },
  //   { label: 'Punjab', value: 'Punjab' },
  //   { label: 'Haryana', value: 'Haryana' },
  //   { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
  //   { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
  //   { label: 'Bihar', value: 'Bihar' },
  //   { label: 'West Bengal', value: 'West Bengal' },
  //   { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  //   { label: 'Karnataka', value: 'Karnataka' },
  // ];

  // const cityList = [
  //   { label: 'Jaipur', value: 'Jaipur' },
  //   { label: 'Jodhpur', value: 'Jodhpur' },
  //   { label: 'Udaipur', value: 'Udaipur' },
  //   { label: 'Ajmer', value: 'Ajmer' },
  //   { label: 'Kota', value: 'Kota' },
  //   { label: 'Bikaner', value: 'Bikaner' },
  //   { label: 'Alwar', value: 'Alwar' },
  //   { label: 'Bharatpur', value: 'Bharatpur' },
  //   { label: 'Sikar', value: 'Sikar' },
  //   { label: 'Tonk', value: 'Tonk' },
  //   { label: 'Jhunjhunu', value: 'Jhunjhunu' },
  //   { label: 'Pali', value: 'Pali' },
  //   { label: 'Chittorgarh', value: 'Chittorgarh' },
  //   { label: 'Nagaur', value: 'Nagaur' },
  //   { label: 'Barmer', value: 'Barmer' },
  // ];

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleState = async (val) => {
    setState(val);
    await cityListApi(val);
  };
  const handleCity = (val) => {
    if (!state) {
      showToast('error', 'Error', 'Please select state first');
    } else {
      setCity(val);
    }
  };
  const handleMaritalSelect = (val) => {
    setSingle(val);
  };
  const handleImgChange = (img) => {
    setImage(img);
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
      }

      stateListApi();
    };
    get_member_id();
  }, []);

  useEffect(() => {
    if (!Object.keys(userData).length) return;

    setInput({
      name: userData?.member_name || '',
      fatherName: userData?.member_father_name || '',
      motherName: userData?.member_mother_name || '',
      mobileNumber: userData?.member_phone || '',
      email: userData?.member_email || '',
      maritalStatus: userData?.member_marital_status || '',
      address: userData?.member_address || '',
    });

    setState(userData?.member_state_id || '');
    setCity(userData?.member_city_id || '');
    setSingle(userData?.member_marital_status === 'Unmarried' ? 1 : 2);
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

      <AppInput
        placeholderText={'Please enter name'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.name}
        handleChange={(value) => handleChange('name', value)}
      />
      {errors?.name && <Text style={styles.nameError}>{errors?.name}</Text>}

      <AppInput
        placeholderText={'Please enter father name'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.fatherName}
        handleChange={(value) => handleChange('fatherName', value)}
      />

      <AppInput
        placeholderText={'Please enter mother name'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.motherName}
        handleChange={(value) => handleChange('motherName', value)}
      />
      <AppInput
        placeholderText={'Please enter mobile number'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.mobileNumber}
        handleChange={(value) => handleChange('mobileNumber', value)}
      />
      <AppInput
        placeholderText={'Please enter email'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.email}
        handleChange={(value) => handleChange('email', value)}
      />

      <AppInput
        placeholderText={'Please enter address'}
        leftIconStyle={styles.passIcon}
        inputBoxStyle={styles.inputBoxStyle}
        value={input.address}
        handleChange={(value) => handleChange('address', value)}
      />
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
      <Text style={styles.addressText1}>Marital Status </Text>

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

      <Text style={styles.addressText1}>State </Text>

      <CustomDropDown
        data={stateList}
        onChange={handleState}
        value={state}
        placeholder={'Select State'}
        dropDownContainer={styles.stateDropDown}
      />

      <Text style={[styles.addressText1, styles.cityText]}>City </Text>
      <CustomDropDown
        data={cityList}
        onChange={handleCity}
        value={city}
        placeholder={'Select City'}
        dropDownContainer={[styles.stateDropDown, styles.cityDropDown]}
      />

      <CustomButton title="Submit" style={styles.btnStyle} />
      <AppImagePicker
        visible={visible}
        onChange={handleImgChange}
        onClose={handleImgClose}
      />
    </ScreenLayout>
  );
};

export default ProfileScreen;
