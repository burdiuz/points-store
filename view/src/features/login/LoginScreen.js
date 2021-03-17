import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LoginForm } from './LoginForm';

export const LoginScreen = () => (
  <Layout style={styles.layout}>
    <LoginForm />
  </Layout>
);

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
