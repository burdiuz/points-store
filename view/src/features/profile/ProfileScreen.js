import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import {
  loadUserPoints,
  selectUserName,
  selectUserRole,
  selectUserPoints,
} from './profileSlice';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const role = useSelector(selectUserRole);
  const points = useSelector(selectUserPoints);

  useEffect(() => {
    dispatch(loadUserPoints());
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text category="h1">{name}</Text>
        <Text appearance="hint">{role}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          appearance="hint"
          category="h1"
          style={{
            fontSize: '30vw',
          }}>
          {points}
        </Text>
      </View>
      <Button
        appearance="outline"
        size="giant"
        onPress={() => dispatch(loadUserPoints())}>
        REFRESH
      </Button>
    </View>
  );
};
