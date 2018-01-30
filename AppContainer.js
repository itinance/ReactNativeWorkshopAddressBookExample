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

export default class AppContainer extends Component<{}> {
  
  render() {
    return (
        <Provider store={Store}>
          <App/>
        </Provider>
    );
  }
}

