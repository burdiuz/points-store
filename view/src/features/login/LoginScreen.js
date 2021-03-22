import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginForm } from './LoginForm';

export const LoginScreen = () => (
  <View style={styles.layout}>
    <LoginForm />
  </View>
);

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
