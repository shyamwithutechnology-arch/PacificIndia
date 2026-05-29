import { View, Text, TextInput, Image } from 'react-native';
import React from 'react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { createStyles } from './styles';
import { Icons } from '../../../assets/icons';

const AppInput = ({
  leftIcon,
  rightIcon,
  placeholderText,
  inputBoxStyle,
  multiline,
  leftIconStyle,
  value,
  handleChange,
  keyboardType = 'default',
  maxLength = null,
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.inputBox, inputBoxStyle]}>
      <View style={styles.leftContent}>
        {leftIcon && (
          <Image
            source={leftIcon}
            style={[styles.leftIcon, leftIconStyle]}
            resizeMode="contain"
          />
        )}
        <TextInput
          placeholder={placeholderText}
          style={[
            styles.inputContainer,
            { marginLeft: !leftIcon ? 0 : theme.tokens.spacing.sm },
          ]}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={theme.tokens.colors.InputText}
          multiline={multiline}
          keyboardType={'number-pad'}
          maxLength={maxLength}
        />
        {rightIcon && (
          <Image
            source={rightIcon}
            style={[styles.leftIcon]}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export default AppInput;
