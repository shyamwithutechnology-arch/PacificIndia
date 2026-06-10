import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStyles } from './styles';
import { useAppTheme } from '../../hooks/useAppTheme';
import AppModal from '../../component/modal/AppModal';

type Props = {
  visible: boolean;
  onClose: () => void;
  handleLodOut: () => void;
};
const LogoutModal = ({ visible, onClose, handleLodOut }: Props) => {
  const handleYesPress = () => {
    handleLodOut();
    onClose();
  };

  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
      containerStyle={styles.modalContainer}
    >
      <View
        style={{
          gap: theme.moderateScale(15),
          paddingVertical: theme.verticalScale(1.5),
        }}
      >
        <Text style={styles.areYouText}>Are you sure you want to logOut?</Text>

        <View style={styles.btnMainContainer}>
          <Pressable
            style={[
              styles.noTexBtn,
              {
                marginHorizontal: theme.moderateScale(20),
                borderWidth: 1,
                borderColor: theme.tokens.colors.primary,
              },
            ]}
            onPress={onClose}
          >
            <Text style={styles.noText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[
              styles.noTexBtn,
              { backgroundColor: theme.tokens.colors.primary },
            ]}
            onPress={handleYesPress}
          >
            <Text style={[styles.noText, { color: theme.tokens.colors.white }]}>
              LogOut
            </Text>
          </Pressable>
        </View>
      </View>
    </AppModal>
  );
};

export default LogoutModal;
