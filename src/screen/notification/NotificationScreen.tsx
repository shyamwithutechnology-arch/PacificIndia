import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { ScreenLayout } from '../../component/ScreenContainer/ScreenLayout';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { AppHeader } from '../../component';
import { Icons } from '../../assets/icons';

const NotificationScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderItem = () => {
    return (
      <Pressable style={styles.notificationBox}>
        <Text style={styles.notificationText}>The Pecific India App</Text>
        <View style={styles.baseLine} />
        <Text style={styles.notificationiDec}>The Pecific India App</Text>
      </Pressable>
    );
  };
  return (
    <ScreenLayout
      header={<AppHeader title="Notification" leftIcon={Icons.leftIcon} />}
    >
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        contentContainerStyle={styles.containerContentStyle}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
};

export default NotificationScreen;
