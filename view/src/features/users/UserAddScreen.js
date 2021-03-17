import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Button, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useHistory } from 'react-router-native';
import { useFormik } from 'formik';

import { createUser } from './usersSlice';
import { Role } from '../../utils';

const ROLES = [
  { title: 'Receiver', value: Role.receiver },
  { title: 'Sender', value: Role.sender },
  { title: 'Admin', value: Role.admin },
];

export const UserAddScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: ROLES[0].value,
      active: '1',
    },
    onSubmit: async ({ username, password, role, active }) => {
      await dispatch(createUser(username, password, ROLES[role], !!active));

      history.goBack();
    },
  });

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text category="h1" style={{ marginBottom: 20, alignSelf: 'center' }}>
        New User
      </Text>
      <View
        style={{
          flex: 1,
        }}>
        <Input
          label="Username"
          style={{ marginBottom: 20 }}
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        <Input
          label="Password"
          secureTextEntry={true}
          style={{ marginBottom: 20 }}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
        />
        <Picker
          selectedValue={formik.values.role}
          onValueChange={(itemValue) => formik.setFieldValue('role', value)}>
          {ROLES.map(({ title, value }) => (
            <Picker.Item label={title} value="java" />
          ))}
        </Picker>
        <View style={{ flexDirection: 'row' }}>
          <Switch
            style={{ marginRight: 10 }}
            value={!!formik.values.active}
            onValueChange={(value) => {
              formik.setFieldValue('active', value ? '1' : '');
            }}
          />
          <Text appearance="hint">Active</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Button
          appearance="outline"
          style={{ flex: 1, marginRight: 20 }}
          onPress={() => history.goBack()}>
          GO BACK
        </Button>
        <Button style={{ flex: 1 }} onPress={formik.handleSubmit}>
          ADD USER
        </Button>
      </View>
    </View>
  );
};
