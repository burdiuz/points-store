import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Icon,
  Layout,
  Input,
  Button,
  Select,
  SelectItem,
  CheckBox,
  Text,
  List,
  ListItem,
} from '@ui-kitten/components';

import { loadUserList, selectUserList } from './usersSlice';
import { selectUserRole, selectUserId } from '../profile/profileSlice';
import { Link, useHistory } from 'react-router-native';
import { Role } from '../../utils';

const ActiveIcon = (props) => (
  <Icon {...props} name="checkmark-circle-2-outline" />
);

const InactiveIcon = (props) => <Icon {...props} name="close-circle-outline" />;

const renderItemIcon = ({ active }) => (props) => {
  return active ? <ActiveIcon {...props} /> : <InactiveIcon {...props} />;
};

const renderItemAccessory = (
  { id, active },
  onActivate,
  onDeactivate,
  onEdit,
  onView,
) => (props) => {
  const currentUserId = useSelector(selectUserId);
  const currentUserRole = useSelector(selectUserRole);

  switch (currentUserRole) {
    case Role.admin:
      return (
        <>
          {active ? (
            <Button
              size="small"
              status="danger"
              disabled={id === currentUserId}
              style={{ width: 110 }}>
              DEACTIVATE
            </Button>
          ) : (
            <Button size="small" status="success" style={{ width: 110 }}>
              ACTIVATE
            </Button>
          )}
          <Button size="small" status="basic" style={{ marginLeft: 10 }}>
            EDIT
          </Button>
        </>
      );
    case Role.sender:
      return (
        <Button size="small" status="basic">
          VIEW
        </Button>
      );
    case Role.receiver:
    default:
      return null;
  }
};

const renderListItem = (onActivate, onDeactivate, onEdit, onView) => ({
  item,
  index,
}) => {
  const { id, username, role, active } = item;

  return (
    <ListItem
      title={username}
      description={role}
      accessoryLeft={renderItemIcon(item)}
      accessoryRight={renderItemAccessory(
        item,
        onActivate,
        onDeactivate,
        onEdit,
        onView,
      )}
    />
  );
};

export const UserListScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector(selectUserList);

  useEffect(() => {
    dispatch(loadUserList());
  }, []);

  return (
    <Layout style={{ flex: 1, margin: 20 }}>
      <List
        style={{ flex: 1 }}
        data={list}
        renderItem={renderListItem()}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              marginVertical: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text appearance="hint">No users found. You don't exist.</Text>
          </View>
        )}></List>
      <Layout
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Button
          appearance="outline"
          style={{ flex: 1 }}
          onPress={() => history.push(`${match.url}/add`)}>
          ADD NEW USER
        </Button>
      </Layout>
    </Layout>
  );
};
