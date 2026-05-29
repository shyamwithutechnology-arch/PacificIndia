import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';

const OTP_LENGTH = 4;

const OTPInput = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme); // ✅ correct usage
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };
  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref!)}
          style={[
            styles.input,
            focusedIndex === index && styles.active, // ✅ only active
          ]}
          onFocus={() => setFocusedIndex(index)}
          value={value}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
        />
      ))}
    </View>
  );
};

// value ? styles.filled :
export default OTPInput;
