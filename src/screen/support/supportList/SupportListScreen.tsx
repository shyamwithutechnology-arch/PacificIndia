import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SupportListScreenProps = {};

const SupportListScreen = (props: SupportListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SupportListScreen component</Text>
    </SafeAreaView>
  );
};

export default SupportListScreen;

const styles = StyleSheet.create({
  container: {},
});
