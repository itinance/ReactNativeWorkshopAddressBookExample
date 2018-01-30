/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Provider } from 'react-redux';

import Store from './src/logic/Store';
import App from './App'

import {openDatabase, closeDatabase, loadAddresses} from './src/data/database';

export default class AppContainer extends Component<{}> {

  async componentWillMount() {

    const data = await openDatabase()

    console.log(1234, data)

    return;
    const items = await loadAddresses();
    console.log("====", items)
  }

  render() {
    return (
        <Provider store={Store}>
          <App/>
        </Provider>
    );
  }
}

