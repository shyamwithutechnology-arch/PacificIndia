import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Loader,
  ScreenLayout,
  AppModal,
  AppInput,
  CustomButton,
} from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { Images } from '../../../assets/images';
import { SearchList } from '../../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { GET, POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { showToast } from '../../../utils/toast';
import { localStorage, storageKeys } from '../../../storage/storage';
import { baseURL } from '../../../component/api/axios';
import { DUMMY_IMAGE } from '../../../api/axios';
import AppDatePicker from '../../../component/appDatePicker/AppDatePicker';
import { formatDateDayMonthShortYear } from '../../../utils/date';

const SelectDoctorScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [memberId, setMemberId] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState(null);
  const [visible, setIsvisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState('');
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [pickerDate, setPickerDate] = useState(new Date());
  const navigation = useNavigation();
  const InputRef = useRef<TextInput>(null);

  const handleVisibleDate = () => {
    setDateVisible(true);
  };

  const handleDateClose = () => {
    setDateVisible(false);
  };
  const handleFocusInput = () => {
    InputRef.current?.focus();
  };

  const handleNavigate = () => {
    // navigation.navigate('DoctorDetails');
  };
  const handleOpenModal = () => {
    setIsvisible(true);
  };

  const handleCloseModal = () => {
    setIsvisible(false);
  };

  const handleComment = (val) => {
    setComment(val);
    setErrors((prev) => ({
      ...prev,
      comment: '',
    }));
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (val) => {
    setPickerDate(val);
    setDate(val);
    setErrors((prev) => ({
      ...prev,
      date: null,
    }));
  };

  const category = [
    {
      id: 1,
      name: 'Dr. Himani Sharma',
      date: '20-5-2026',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg1,
    },
    {
      id: 2,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg2,
      date: '20-5-2026',
    },
    {
      id: 3,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
      date: '20-5-2026',
    },
    {
      id: 4,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg1,
    },
    {
      id: 5,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg2,
      date: '20-5-2026',
    },
    {
      id: 6,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
      date: '20-5-2026',
    },
  ];

  // const handleSelectDoctor = (item) => {
  //   setSelectedDoctors((prev) => (prev === item.dr_id ? null : item.dr_id));
  // };
  const handleSelectDoctor = (item) => {
    if (selectedDoctors === item.dr_id) {
      setSelectedDoctors(null); // uncheck
      setIsvisible(false);
    } else {
      setSelectedDoctors(item.dr_id); // check
      setIsvisible(true); // open modal
    }
  };

  const fetchDoctorList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.listDoctor, {
        member_id: id,
      });
      if (response?.status === '1') {
        setDoctorList(response?.result || []);
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

  const validate = () => {
    const errors = {};

    if (!comment?.trim()) {
      errors.comment = 'Please enter comment';
    }

    // if (!date) {
    //   errors.date = 'Please select date';
    // }

    return errors;
  };

  //   team_member_id: memberId,
  // doctor_id: selectedDoctors,
  // comment: comment,
  // next_schedule_date: formatDate(date),

  // team_member_id: 32,
  // doctor_id: 1614,
  // comment: 'Daily Visit',
  // next_schedule_date: '20-10-2026',
  const AddDoctor = async () => {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.addDailyVisitByMemberId, {
        team_member_id: memberId,
        doctor_id: selectedDoctors,
        comment: comment,
        next_schedule_date: formatDateDayMonthShortYear(date),
      });

      if (response?.status === '1') {
        showToast('success', 'Success', response?.msg);
        handleCloseModal();
      }
    } catch (error) {
      showToast('error', 'Error', error?.msg || 'Something went wrong.');
    } finally {
      setLoading(false);
      setComment('');
      setDate(null);
      setSelectedDoctors(null);
      setIsvisible(false);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedDoctors === item?.dr_id;
    return (
      <Pressable style={styles.cart}>
        <Image
          source={{ uri: DUMMY_IMAGE }}
          style={styles.categoryImg}
          borderRadius={theme.tokens.radius.md}
        />
        <View style={styles.mainCardInner}>
          <Text style={styles.titleText}>{item?.dr_name}</Text>
          <Text style={[styles.titleDecText, styles.specialityText]}>
            {item?.dr_speciality_name}
          </Text>
          <View style={styles.mapRow}>
            <Image
              source={Icons.mapFillIcon}
              style={styles.verificationImg}
              resizeMode="contain"
              tintColor={'#adadad'}
            />
            <Text style={[styles.titleDecText, styles.locationText]}>
              {item?.dr_address}
            </Text>
          </View>
        </View>

        <Pressable
          style={[styles.checkBoxContainer, isSelected && styles.selectedCheck]}
          onPress={() => {
            handleSelectDoctor(item);
          }}
        >
          <Image
            source={isSelected ? Icons.checkIcon : undefined}
            style={styles.checkIcon}
            resizeMode="contain"
            tintColor={'#fff'}
          />
        </Pressable>
      </Pressable>
    );
  };

  const filteredList = useMemo(() => {
    if (!search.trim()) {
      return doctorList;
    }

    return doctorList?.filter((item) =>
      item?.dr_name?.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [doctorList, search]);

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // useEffect(() => {
  //   const getMemberId = async () => {
  //     const Id = await localStorage.getItem(storageKeys.member_id);

  //   };
  //   getMemberId();
  // }, []);
  useEffect(() => {
    const getId = async () => {
      const id = await localStorage.getItem(storageKeys.member_id);
      if (id) {
        fetchDoctorList(id);
        setMemberId(id);
      }
    };
    getId();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Select Doctor"
          search={search}
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
    >
      <Loader visible={loading} />
      <SearchList
        value={search}
        onChange={setSearch}
        searchRowCustom={styles.searchTop}
        searchPlaceHolder={'Search Doctor....'}
      />

      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <AppModal visible={visible} onClose={handleCloseModal}>
        <Text style={[styles.addressText1]}>Comment</Text>

        <Pressable style={styles.appInputBox} onPress={handleFocusInput}>
          <TextInput
            value={comment}
            onChangeText={handleComment}
            placeholder={'Comment'}
            multiline={true}
            ref={InputRef}
          />
        </Pressable>
        {errors?.comment ? (
          <Text style={styles.nameError}>{errors?.comment}</Text>
        ) : undefined}

        <Text style={[styles.addressText1, styles.dateText]}>Date</Text>
        <Pressable style={styles.dateInputBox} onPress={handleVisibleDate}>
          <Text style={styles.datePlaceholder}>
            {date ? formatDate(date) : 'Select Next Schedule'}
          </Text>
        </Pressable>
        {
          // {errors?.date ? (
          //   <Text style={styles.nameError}>{errors?.date}</Text>
          // ) : undefined}
        }

        <CustomButton
          title="Submit"
          style={styles.submitBtn}
          onPress={AddDoctor}
        />
      </AppModal>

      <AppDatePicker
        value={pickerDate}
        onChange={handleDateChange}
        visible={dateVisible}
        onClose={handleDateClose}
      />
    </ScreenLayout>
  );
};

export default SelectDoctorScreen;
