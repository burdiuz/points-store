import React from 'react';
import { View } from 'react-native';
import {
  Layout,
  Input,
  Button,
  Select,
  SelectItem,
  CheckBox,
  Text,
} from '@ui-kitten/components';

export const TasksScreen = () => (
  <Layout style={{ flex: 1, margin: 20 }}>
    <Text category="h1" style={{ marginBottom: 20, alignSelf: 'center' }}>
      New Action/Task
    </Text>
    <Layout
      style={{
        flex: 1,
      }}>
      <Input label="Action Name" style={{ marginBottom: 20 }} />
      <Input label="Points Amount" style={{ marginBottom: 20 }} />
      <Select label="Action Type" style={{ marginBottom: 20 }}>
        <SelectItem title="Earn Points Task" />
        <SelectItem title="Spend Points Action" />
        <SelectItem title="Fine / Penalty" />
      </Select>
      <Layout style={{ flexDirection: 'row' }}>
        <CheckBox checked={true} style={{ marginRight: 10 }} />
        <Text appearance="hint">Active</Text>
      </Layout>
    </Layout>
    <Layout
      style={{
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: 20,
      }}>
      <Button appearance="outline" style={{ flex: 1, marginRight: 20 }}>
        SHOW ALL USERS
      </Button>
      <Button style={{ flex: 1 }}>ADD USER</Button>
    </Layout>
  </Layout>
);
