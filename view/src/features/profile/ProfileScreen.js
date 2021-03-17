import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Text, Button } from '@ui-kitten/components';

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
    <Layout style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
      <Layout style={{ flexDirection: 'row' }}>
        <Text category="h1">{name}</Text>
        <Text appearance="hint">{role}</Text>
      </Layout>
      <Layout
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          appearance="hint"
          category="h1"
          style={{
            fontSize: '30vw',
          }}>
          {points}
        </Text>
      </Layout>
      <Button
        appearance="outline"
        size="giant"
        onPress={() => dispatch(loadUserPoints())}>
        REFRESH
      </Button>
    </Layout>
  );
};
