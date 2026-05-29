import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../../theme';

interface Props {
  value: string;
  length?: number;
  onChange: (otp: string) => void;
}

export type OtpInputRef = {
  focus: () => void;
  blur: () => void;
};

const OtpInput = forwardRef<OtpInputRef, Props>(
  ({ value, length = 4, onChange }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    // expose focus / blur to parent
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => {
        inputRef.current?.blur();
        setIsFocused(false); // ✅ removes green cursor
      },
    }));

    // useEffect(() => {
    //   inputRef.current?.focus();
    // }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }, []);

    const handleChange = (text: string) => {
      const clean = text.replace(/\D/g, '').slice(0, length);
      onChange(clean);
    };

    return (
      <View style={styles.container}>
        <View style={styles.boxes}>
          {Array.from({ length }).map((_, i) => {
            const digit = value[i] ?? '';
            const showCursor = isFocused && i === value.length;

            return (
              <Pressable key={i} onPress={() => inputRef.current?.focus()}>
                <View style={[styles.box, showCursor && styles.activeBox]}>
                  <Text style={styles.text}>{digit}</Text>
                  {showCursor && <View style={styles.cursor} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Hidden Input */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={length}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.hiddenInput}
        />
      </View>
    );
  }
);

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(20),
  },
  boxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(12),
  },
  box: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.InputStroke,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeBox: {
    borderColor: '#008CE3',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.ManropeSemiBold,
    color: colors.black,
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: 26,
    backgroundColor: '#008CE3',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
});
