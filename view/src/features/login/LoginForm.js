import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Input, Text, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { signIn } from './loginSlice';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">Sign In</Text>
  </View>
);

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
    <Card
      style={styles.card}
      enable={false}
      appearance="outline"
      header={Header}
      footer={(props) => (
        <Footer
          {...props}
          disabled={!login || !password}
          onSubmit={() => onSubmit(login, password)}
        />
      )}>
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
