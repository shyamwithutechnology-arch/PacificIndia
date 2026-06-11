import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import {
  ScreenLayout,
  AppHeader,
  AppInput,
  CustomButton,
  Loader,
  CustomDropDown,
} from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { Images } from '../../assets/images';
import UserIcon from 'react-native-vector-icons/FontAwesome6';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { showToast } from '../../utils/toast';
import { localStorage, storageKeys } from '../../storage/storage';

const SupportTicketScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const InputRef = useRef<TextInput>(null);
  const scrollRef = useRef(null);

  const [seach, setSearch] = useState('');
  const [memberId, setMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [supportDetails, setSupportDetails] = useState({});

  const subjectData = [
    { id: 1, label: 'Appointment Issue', value: 'Appointment Issue' },
    { id: 2, label: 'Doctor Consultation', value: 'Doctor Consultation' },
    { id: 3, label: 'Prescription Issue', value: 'Prescription Issue' },
    { id: 4, label: 'Payment Problem', value: 'Payment Problem' },
    { id: 5, label: 'Refund Request', value: 'Refund Request' },
    { id: 6, label: 'Lab Report Issue', value: 'Lab Report Issue' },
    { id: 7, label: 'Account/Login Issue', value: 'Account/Login Issue' },
    { id: 8, label: 'Other', value: 'Other' },
  ];

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFocusInput = () => {
    InputRef.current?.focus();
  };
  const fetchSupportApi = async (stateId) => {
    try {
      setLoading(true);
      const res = await GET(ApiEndPoint.support);
      if (res?.status === '1') {
        setSupportDetails(res.result);
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

  const handleSupport = async () => {
    if (!subject) {
      showToast('error', 'Error', 'Please select subject');
      return;
    }

    if (!comment?.trim()) {
      showToast('error', 'Error', 'Please enter comment');
      return;
    }

    try {
      setLoading(true);
      const res = await POST_FORM(`${ApiEndPoint.supportMail}`, {
        member_id: memberId,
        subject: subject,
        comment: comment,
      });
      if (res?.status === '1') {
        showToast('success', 'Success', res?.msg);
      } else {
        showToast('error', 'Error', res?.msg);
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
    let getMemberId = async () => {
      const id = await localStorage.getItem(storageKeys.member_id);
      setMemberId(id);
    };
    getMemberId();
    fetchSupportApi();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Support"
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
      innerContainer={styles.innerContainer}
      extraScrollHeight={120}
      scroll={true}
    >
      <Loader visible={loading} />
      <View style={styles.customerCareBox}>
        <View style={styles.logoHederRow}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.pacificText}>Medwell Pacific</Text>
            <Text style={styles.customerText}>Customer Care</Text>
          </View>
        </View>
        <Pressable style={styles.callIcon}>
          <Image source={Images.apppointments1} style={styles.callIcon} />
        </Pressable>
      </View>

      <View style={styles.headerBox}>
        <View style={styles.nameRow}>
          <Image
            source={Icons.namecon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>{supportDetails?.name}</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.callFillIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>{supportDetails?.phone}</Text>
        </View>
        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.emailIcon}
            style={styles.nameIcon}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>{supportDetails?.email}</Text>
        </View>

        <View style={styles.baseLine} />

        <View style={styles.nameRow}>
          <Image
            source={Icons.mapFillIcon}
            style={styles.nameIcon}
            resizeMode="contain"
            tintColor={theme.tokens.colors.primary}
          />
          <Text style={styles.nameText}>{supportDetails?.address}</Text>
        </View>
      </View>

      <View style={styles.headerBox}>
        <Text style={styles.haveAnyText}>Have any query?</Text>

        <Text style={[styles.addressText1]}>Subject </Text>
        <CustomDropDown
          data={subjectData}
          value={subject}
          onChange={setSubject}
          placeholder="Select Subject"
          dropDownContainer={styles.dropDownContainer}
        />

        <Text style={[styles.addressText1]}>Comment </Text>
        <Pressable style={styles.appInputBox} onPress={handleFocusInput}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder={'Comment'}
            multiline={true}
            ref={InputRef}
            onFocus={() => {
              scrollRef.current?.scrollToEnd();
            }}
          />
        </Pressable>
        <CustomButton
          title="Submit"
          style={styles.submitBtn}
          onPress={handleSupport}
        />
      </View>
    </ScreenLayout>
  );
};

export default SupportTicketScreen;
// <View style={styles.baseLine} />
