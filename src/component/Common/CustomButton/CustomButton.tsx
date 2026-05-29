import {
  Image,
  Pressable,
  StyleProp,
  Text,
  TextProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './styles';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Icons } from '../../../assets/icons';

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextProps>;
  disabled?: boolean;
  rightIcon?: string;
};

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  rightIcon,
}: CustomButtonProps) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Pressable onPress={onPress} disabled={disabled} style={styles.pressable}>
      {({ pressed }: { pressed: boolean }) => (
        <LinearGradient
          style={[
            styles.button,
            style,
            pressed && styles.pressed,
            disabled && styles.disabled,
          ]}
          colors={[theme.tokens.colors.primary, '#0a658d']}
        >
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          {rightIcon && (
            <Image
              source={rightIcon}
              style={styles.rightIcon}
              resizeMode="contain"
            />
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
};

export default React.memo(CustomButton);
