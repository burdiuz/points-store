import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Layout,
  Input,
  Button,
  Select,
  SelectItem,
  CheckBox,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import { useHistory } from 'react-router-native';
import { useFormik } from 'formik';

import { createUser } from './usersSlice';
import { Role } from '../../utils';

const ROLES = [Role.receiver, Role.sender, Role.admin];
const ROLE_TITLES = ['Receiver', 'Sender', 'Admin'];

export const UserAddScreen = () => {
  const [rolePath, setRolePath] = useState(new IndexPath(0));
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: `${rolePath.row}`,
      active: '1',
    },
    onSubmit: async ({ username, password, role, active }) => {
      await dispatch(createUser(username, password, ROLES[role], !!active));

      history.goBack();
    },
  });

  return (
    <Layout style={{ flex: 1, margin: 20 }}>
      <Text category="h1" style={{ marginBottom: 20, alignSelf: 'center' }}>
        New User
      </Text>
      <Layout
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
        <Select
          label="Role"
          style={{ marginBottom: 20 }}
          selectedIndex={rolePath}
          value={ROLE_TITLES[rolePath.row]}
          onSelect={(indexPath) => {
            formik.handleChange('role')(`${indexPath.row}`);
            setRolePath(indexPath);
          }}
          onBlur={formik.handleBlur('role')}>
          <SelectItem title="Receiver" />
          <SelectItem title="Sender" />
          <SelectItem title="Admin" />
        </Select>
        <Layout style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={true}
            style={{ marginRight: 10 }}
            checked={!!formik.values.active}
            onChange={(value) => {
              formik.handleChange('active')(value ? '1' : '');
            }}
            onBlur={formik.handleBlur('active')}
          />
          <Text appearance="hint">Active</Text>
        </Layout>
      </Layout>
      <Layout
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
      </Layout>
    </Layout>
  );
};
