/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Card,
  Text,
  Input,
  Button,
  Divider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import { LoginScreen } from './features/login';
import { MainLayout } from './Layout';
import { Routes } from './Routes';
import { store } from './store';

const HomeScreen = () => (
  <Layout
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}></Layout>
);

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ApplicationProvider>
    </>
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

export default App;
