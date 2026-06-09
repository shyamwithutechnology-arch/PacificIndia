import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { ScreenLayout, AppHeader, Loader } from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { createStyles } from './styles';
import { showToast } from '../../../utils/toast';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';

const AppointMentDetailsScreen = ({ navigation, route }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  const { apointMentId } = route?.params || {};
  // detailsAppointment

  const fetchAppointList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.detailsAppointment, {
        appointment_id: id,
      });

      if (response?.status === '1') {
        setAppointmentDetails(response?.result[0]);
      } else {
        showToast('error', 'Error', response?.msg || 'Faild Insert');
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

  const DetailRow = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );

  useEffect(() => {
    if (apointMentId) {
      fetchAppointList(apointMentId);
    }
  }, [apointMentId]);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Appointment Details"
          leftIcon={Icons.leftIcon}
          onPress={() => navigation.goBack()}
        />
      }
      innerContainer={styles.innerContainer}
      scroll={true}
    >
      <Loader visible={loading} />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Doctor Information</Text>

        <DetailRow label="Doctor Name" value={appointmentDetails.doctor_name} />
        <DetailRow
          label="Mobile Number"
          value={appointmentDetails.doctor_mobile}
        />
        <DetailRow label="Email" value={appointmentDetails.doctor_email} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Appointment</Text>

        <DetailRow
          label="Appointment Date"
          value={appointmentDetails.appointment_date}
        />
        <DetailRow
          label="Appointment Time"
          value={appointmentDetails.appointment_time}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Hospital Details</Text>

        <DetailRow
          label="Hospital Name"
          value={appointmentDetails.hospital_name}
        />
        <DetailRow
          label="Address"
          value={appointmentDetails.hospital_address}
        />
        <DetailRow
          label="Locality"
          value={appointmentDetails.hospital_locality}
        />
        <DetailRow label="State" value={appointmentDetails.state_name} />
        <DetailRow label="City" value={appointmentDetails.city_name} />
      </View>

      {appointmentDetails.appointment_comment && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Comment</Text>

          <Text style={styles.commentText}>
            {appointmentDetails.appointment_comment || '-'}
          </Text>
        </View>
      )}
    </ScreenLayout>
  );
};

export default AppointMentDetailsScreen;
