/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Provider } from 'react-redux';

import Store from './src/logic/Store';
import App from './App'

import {openDatabase, closeDatabase, loadAddresses, insertAddress} from './src/data/database';

export default class AppContainer extends Component<{}> {

  async componentWillMount() {

    try {
        await openDatabase()
    } catch(err) {
        Alert.alert('Error', err.message)
    }

    const items = await loadAddresses();
    console.log("====", items)

    await insertAddress({
      firstname: 'Olaf',
      lastname: 'Ludwig',
      street: 'Tonne 1'
    })
  }

  render() {
    return (
        <Provider store={Store}>
          <App/>
        </Provider>
    );
  }
}

