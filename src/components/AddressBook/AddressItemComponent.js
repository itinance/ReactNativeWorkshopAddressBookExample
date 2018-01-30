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

import {Actions} from 'react-native-router-flux'

export default class AddressItemComponent extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>

            <TouchableOpacity onPress={Actions.pop}>
                <Text>BACK</Text>
            </TouchableOpacity>

      </View>
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
