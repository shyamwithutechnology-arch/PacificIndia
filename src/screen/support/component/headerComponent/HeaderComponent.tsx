import { View, Text, Pressable, Image, TextInput } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles, styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterIcon from 'react-native-vector-icons/Feather';
import { colors } from '../../../../theme';
import { moderateScale } from '../../../../utils/responsiveSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { localStorage, storageKeys } from '../../../../storage/storage';
import AppDropDown from '../../../../component/dropdown/AppDropDown';
import AppButton from '../../../../component/button/AppButton';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../../../utils/toast';
import { POST_FORM } from '../../../../api/request';
import { ApiEndPoint } from '../../../../api/endPoints';

const HeaderComponent = () => {
  return (
    <>
      <View style={styles.inputMainBox}>
        <View style={styles.textInputBox}>
          <TextInput
            placeholder="Search Conversation....."
            style={styles.inputBox}
            placeholderTextColor={colors.gray}
          />

          <LinearGradient
            colors={[colors.primaryGradientStart, colors.primaryGradientEnd]}
            style={styles.searchBox}
          >
            <Icon
              name="search-outline"
              size={moderateScale(18)}
              color={colors.white}
            />
          </LinearGradient>
        </View>

        <View style={styles.filterIconBox}>
          <FilterIcon
            name="filter"
            size={moderateScale(16)}
            color={colors.white}
          />
        </View>
      </View>

      <Text style={styles.popularArticle}>Popular Article</Text>
    </>
  );
};

export default React.memo(HeaderComponent);
