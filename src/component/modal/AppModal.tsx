import React, { memo } from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;

  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;

  closeOnBackdrop?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
};

const AppModal = ({
  visible,
  onClose,
  children,
  containerStyle,
  contentStyle,
  closeOnBackdrop = true,
  animationType = 'fade',
}: AppModalProps) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      statusBarTranslucent
      onRequestClose={onClose} // Android back
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Backdrop */}
        <Pressable
          style={[styles.backdrop, containerStyle]}
          onPress={closeOnBackdrop ? onClose : undefined}
        >
          {/* Content */}
          <Pressable
            onPress={() => {}} // prevent closing when clicking inside
            style={[styles.content, contentStyle]}
          >
            {children}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default memo(AppModal);
