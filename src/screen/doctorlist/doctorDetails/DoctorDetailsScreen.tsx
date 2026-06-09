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
import { useRoute } from '@react-navigation/native';
import { createStyles } from './styles';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { ScreenLayout, AppHeader, Loader } from '../../../component';
import { Icons } from '../../../assets/icons';
import { Images } from '../../../assets/images';
import { showToast } from '../../../utils/toast';
import { localStorage, storageKeys } from '../../../storage/storage';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { formatDateDDMMYYYY } from '../../../utils/date';

const DoctorDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { dr_id } = route?.params;
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [doctorList, setDoctorList] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(('doctorList', doctorList));

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNotification = useCallback(() => {
    showToast('success', 'Success', 'Comming soon');
  }, []);

  const information = [
    {
      id: 1,
      title: 'Location',
      dec: doctorList?.dr_address,
      img: Icons.mapFillIcon,
    },
    { id: 2, title: 'D.O.B', dec: doctorList?.dr_dob, img: Icons.calendarIcon },
    {
      id: 3,
      title: 'Married Status',
      dec: doctorList?.dr_marital,
      img: Icons.marritalStatusIcon,
    },
    {
      id: 4,
      title: 'Speciality',
      dec: doctorList?.dr_speciality_name,
      img: Icons.specialityIcon,
    },
    {
      id: 5,
      title: 'Branch',
      dec: doctorList?.dr_speciality_name,
      img: Icons.branchIcon,
    },
  ];

  const InformationCard = ({ title, dec, img }) => {
    return (
      <View>
        <View style={styles.locationCenter}>
          <View style={styles.profileRow}>
            <View style={styles.emilBox}>
              <Image
                source={img}
                resizeMode="contain"
                style={styles.emailcon}
              />
            </View>

            <Text style={styles.locationText}>{title}</Text>
          </View>

          <Text style={[styles.locationText, styles.womenText]}>{dec}</Text>
        </View>

        <View style={[styles.baseLine, styles.bottomSpace]} />
      </View>
    );
  };

  const doctorDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.detailsDoctor, {
        dr_id: id,
      });
      if (response?.status === '1') {
        setDoctorList(response?.result[0] || []);
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
    const getId = async () => {
      if (dr_id) {
        doctorDetails(dr_id);
      }
    };
    getId();
  }, [route.params]);

  // useEffect(() => {
  //   console.log('doctorList =>', doctorList);
  //   console.log('member_id =>', doctorList?.member_id);

  //   Alert.alert(
  //     'Debug',
  //     JSON.stringify({
  //       member_id: doctorList?.member_id,
  //       dr_id: doctorList?.dr_id,
  //     })
  //   );
  // }, [doctorList]);
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Doctor Details"
          search={seach}
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
          notificationPress={handleNotification}
        />
      }
    >
      <Loader visible={loading} />
      <View style={styles.card}>
        <View style={styles.headerCardInner}>
          <View style={styles.profileRow}>
            <Image
              source={
                doctorList?.dr_hospital_image
                  ? { uri: doctorList?.dr_hospital_image }
                  : Images.doctorImg1
              }
              style={styles.docImg}
              borderRadius={theme.tokens.radius.xxl}
            />
            <View>
              <View>
                <Text style={styles.titleText}>{doctorList?.dr_name}</Text>
                <Text style={styles.titleDecText}>
                  {doctorList?.dr_speciality_name}
                </Text>
                <Text style={[styles.titleDecText, styles.idText]}>
                  ID : {doctorList?.dr_id}
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate('AddDoctor', {
                title: 'Edit Doctor',
                doctorId: doctorList?.dr_id,
              })
            }
          >
            <Text style={styles.editText}>Edit Details</Text>
          </Pressable>
        </View>

        <View style={styles.baseLine} />
        {
          // <View style={[styles.profileRow, { justifyContent: 'space-between' }]}>
        }
        <View style={[styles.profileRow, styles.mailRow]}>
          <View style={styles.emilBox}>
            <Image
              source={Icons.emailIcon}
              resizeMode="contain"
              style={styles.emailcon}
            />
          </View>

          <Text style={styles.mailText}>{doctorList?.dr_email}</Text>
        </View>

        <View style={[styles.profileRow, styles.mailRow]}>
          <View style={styles.emilBox}>
            <Image
              source={Icons.callFillIcon}
              resizeMode="contain"
              style={styles.callIcon}
            />
          </View>

          <Text style={styles.mailText}>+91-{doctorList?.dr_phone}</Text>
        </View>
        {
          // </View>
        }
      </View>

      <View style={styles.personalInformation}>
        <View style={styles.personalInfoInner}>
          <Text style={styles.personalInfoText}>Personal Information</Text>
        </View>

        {
          // <View style={styles.innerPerformationBox}>
          //   {information.map((item) => (
          //     <informationCard
          //       title={item?.title}
          //       dec={item?.dec}
          //       img={item?.img}
          //     />
          //   ))}
          // </View>
        }
        <View style={styles.innerPerformationBox}>
          {information.map((item) => (
            <InformationCard
              key={item.id}
              title={item.title}
              dec={item.dec}
              img={item.img}
            />
          ))}
        </View>
      </View>

      <View style={[styles.locationCenter, styles.locationBnt]}>
        <Pressable
          style={styles.doctorMedicineBtn}
          onPress={() =>
            navigation.navigate('MedicenList', { dr_id: doctorList?.member_id })
          }
        >
          <Text style={styles.doctorText}>Doctor Medicine</Text>
        </Pressable>

        <Pressable
          style={[styles.doctorMedicineBtn, styles.medecinBox]}
          onPress={() =>
            navigation.navigate('SpecialityStack', {
              screen: 'SpecialityDetails',
              medicine_id: doctorList?.dr_id,
            })
          }
        >
          <Text style={styles.doctorText}> Medicine</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default DoctorDetailsScreen;
