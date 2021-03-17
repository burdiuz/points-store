/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Routes } from './Routes';
import { store } from './store';

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </SafeAreaProvider>
);

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
