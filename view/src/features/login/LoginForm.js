import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Input, Text, Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

import { signIn } from './loginSlice';

const Footer = ({ onSubmit, disabled, ...props }) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size="small"
      onPress={onSubmit}
      disabled={disabled}>
      PROCEED
    </Button>
  </View>
);

export const LoginFormView = ({ onSubmit }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Sign In</Card.Title>
      <Card.Divider />
      <Input
        value={login}
        label="Username"
        onChangeText={setLogin}
        style={{ marginBottom: 15 }}
      />
      <Input
        value={password}
        label="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Card.Divider />
      <Footer
        disabled={!login || !password}
        onSubmit={() => onSubmit(login, password)}
      />
    </Card>
  );
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <LoginFormView
      onSubmit={(login, password) => dispatch(signIn(login, password))}
    />
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    minWidth: 480,
    width: '25%',
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
