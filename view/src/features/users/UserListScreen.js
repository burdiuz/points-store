import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button, Text, ListItem } from 'react-native-elements';

import { loadUserList, selectUserList } from './usersSlice';
import { selectUserRole, selectUserId } from '../profile/profileSlice';
import { useHistory } from 'react-router-native';
import { Role } from '../../utils';

const ActiveIcon = (props) => (
  <Icon {...props} name="checkmark-circle-2-outline" />
);

const InactiveIcon = (props) => <Icon {...props} name="close-circle-outline" />;

const ItemIcon = ({ active }) => {
  return active ? <ActiveIcon /> : <InactiveIcon />;
};

const ItemAccessory = ({
  item: { id, active },
  onActivate,
  onDeactivate,
  onEdit,
  onView,
}) => {
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

export const UserListScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector(selectUserList);

  const onActivate = null;
  const onDeactivate = null;
  const onEdit = null;
  const onView = null;

  useEffect(() => {
    dispatch(loadUserList());
  }, []);

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        {list.length ? (
          list.map((item) => {
            const { id, username, role, active } = item;

            return (
              <ListItem key={id} bottomDivider>
                <ItemIcon active={active} />
                <ListItem.Content>
                  <ListItem.Title>{username}</ListItem.Title>
                  <ListItem.Subtitle>{role}</ListItem.Subtitle>
                </ListItem.Content>
                <ItemAccessory
                  item={item}
                  onActivate={onActivate}
                  onDeactivate={onDeactivate}
                  onEdit={onEdit}
                  onView={onView}
                />
              </ListItem.Title>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              marginVertical: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text appearance="hint">No users found. You don't exist.</Text>
          </View>
        )}
      </ScrollView>
      <View
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
      </View>
    </View>
  );
};
