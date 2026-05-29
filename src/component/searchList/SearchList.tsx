import { View, Text, TextInput, Pressable, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import SeachIcon from 'react-native-vector-icons/EvilIcons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';

export const SearchList = ({
  value,
  onChange,
  customStyles,
  filter = false,
  searchRowCustom,
  searchPlaceHolder = 'Types Services...',
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const ref = useRef();

  const handleActiveInput = () => {
    ref.current?.focus();
  };

  return (
    <View style={[styles.searchRow, searchRowCustom]}>
      <View style={[styles.seachTextBox, customStyles]}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={searchPlaceHolder}
          placeholderTextColor={theme.tokens.colors.lightGray}
          style={styles.textInput}
          ref={ref}
        />

        {value === '' ? (
          <Pressable onPress={handleActiveInput}>
            <View style={styles.seachBox}>
              <SeachIcon
                name="search"
                color="#fff"
                size={theme.moderateScale(22)}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={() => onChange('')}>
            <CancelIcon
              name="cancel"
              color="red"
              size={theme.moderateScale(20)}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
