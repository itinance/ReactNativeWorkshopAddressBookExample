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
  View
} from 'react-native';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Stack,
} from 'react-native-router-flux';

import AddressListComponent from './src/components/AddressBook/AddressListComponent'
import AddressItemComponent from './src/components/AddressBook/AddressItemComponent'

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
          <Stack key="root">
            <Scene key="main" component={AddressListComponent} title="Addressbook"/>
            <Scene key="register" component={AddressItemComponent} title="Address"/>
          </Stack>
      </Router>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
