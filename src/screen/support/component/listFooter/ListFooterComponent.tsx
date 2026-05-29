import { Images } from '../../../../assets/images';
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterIcon from 'react-native-vector-icons/Feather';
import { colors, Fonts } from '../../../../theme';
import { moderateScale, verticalScale } from '../../../../utils/responsiveSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { localStorage, storageKeys } from '../../../../storage/storage';
import AppDropDown from '../../../../component/dropdown/AppDropDown';
import AppButton from '../../../../component/button/AppButton';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../../../utils/toast';
import { POST_FORM } from '../../../../api/request';
import { ApiEndPoint } from '../../../../api/endPoints';

const data = [
  {
    label: 'Account and setting  Issue',
    value: '1',
    date: '13-01-2026',
    statusColor: '#FFC107',
  },
  {
    label: 'Question and solution Issue',
    value: '2',
    date: '13-01-2026',
    statusColor: '#4CAF50',
  },
  {
    label: 'Generate and pdf issue',
    value: '4',
    date: '13-01-2026',
    statusColor: '#FFC107',
  },
  {
    label: 'Other issue',
    value: '5',
    date: '13-01-2026',
    statusColor: '#FFC107',
  },
];

const ListFooterComponent = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState<string | null>('');
  const [errors, setErrors] = useState({
    dropDownValue: '',
    comment: '',
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<
    Record<string, 'like' | 'dislike' | null>
  >({});

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNewTicket = useCallback(() => {
    navigation.navigate('NewTicket');
  }, [navigation]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setFeedback((prev) => {
      const current = prev[id];

      return {
        ...prev,
        [id]: current === type ? null : type, // toggle
      };
    });
  };

  const handleCommentChange = (text) => {
    setComment(text);
    if (errors.comment) {
      setErrors((prev) => ({ ...prev, comment: '' }));
    }
  };

  const handleDropdownChange = (value: string | null) => {
    setDropDownValue(value);
    setErrors((pre) => ({ ...pre, dropDownValue: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!dropDownValue?.trim()) {
      newErrors.dropDownValue = 'Please select issue type';
    }
    if (!comment.trim()) {
      newErrors.comment = 'Type a message...';
    }
    return newErrors;
  };

  const handleSupport = async () => {
    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const params = {
        usr_id: userId,
        usr_subject: dropDownValue,
        usr_comment: comment,
      };

      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.support, params);
      console.log('response', response);

      if (response.status === 200 || response.status === '1') {
        showToast(
          'success',
          'Success',
          response?.msg || 'Your delete request submitted successfully'
        );
      } else {
        showToast('error', 'Error', 'Your delete request faild');
      }
    } catch (error) {
      if (error.offline) {
        return true;
      }
      const errorMessage =
        error?.response.data.msg ||
        error.msg ||
        'Something went wrong. Please try again.';
      showToast('error', 'Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let authDetils = async () => {
      const user_Id = await localStorage.getItem(storageKeys.userId);
      setUserId(user_Id ?? '');
    };
    authDetils();
  }, []);

  return (
    <>
      <View style={styles.createTicketBox}>
        <View style={styles.dropDownBox}>
          <Text style={styles.createTicketText}>Create ticket</Text>
          <AppDropDown
            data={data}
            value={dropDownValue}
            setValue={handleDropdownChange}
            placeHolderText={'Subject'}
            dropdownStyle={[styles.dropDownStyle]}
            itemContainerStyle={styles.dropDownItem}
          />
          {errors?.dropDownValue && (
            <Text style={styles.dropDownError}>{errors?.dropDownValue}</Text>
          )}
        </View>
        <View style={styles.commentInputBox}>
          <TextInput
            style={[styles.phoneInput]}
            placeholder="Comment"
            placeholderTextColor={colors.ParagraphAndShortTexts}
            value={comment}
            onChangeText={handleCommentChange}
            multiline={true}
          />
        </View>
        {errors?.comment && (
          <Text style={[styles.dropDownError]}>{errors?.comment}</Text>
        )}

        <AppButton
          title="Submit"
          style={styles.appBtn}
          onPress={handleSupport}
        />
      </View>

      <LinearGradient
        colors={['rgba(19, 186, 172, 0.13)', 'rgba(214, 234, 232, 1)']}
        style={styles.needHelpBox}
      >
        <View>
          <Text style={styles.needText}>Need Help?</Text>
          <Text style={styles.contextText}>Contact to our team for help.</Text>

          <View style={styles.createTicketBtn}>
            <Icon
              name="call-sharp"
              color={'#1668E3'}
              size={moderateScale(15)}
            />
            <Text style={styles.createTicket}>+91-9510779200</Text>
          </View>
        </View>
        <View style={styles.helpImgBox}>
          <Image
            source={Images.helpSupportImg}
            style={styles.helpImg}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default React.memo(ListFooterComponent);
