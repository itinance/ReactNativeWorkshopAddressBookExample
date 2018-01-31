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

import {connect} from 'react-redux';

import {ACTIONS} from 'AdressBook/src/logic/actions';
import App from './App'

import {reloadAddresses} from './src/logic/thunk/saveAddress';
import {openDatabase} from './src/data/database';

class AppContainer extends Component<{}> {

  async componentWillMount() {

    try {
        await openDatabase()
    } catch(err) {
        Alert.alert('Error', err.message)
    }

    this.props.reloadAddresses()

    /*const items = await loadAddresses();
    console.log("====", items)

    await insertAddress({
      firstname: 'Olaf',
      lastname: 'Ludwig',
      street: 'Tonne 1'
    })*/
  }

  render() {
    return (
          <App/>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

//const loadAddresses = () => dispatch => dispatch({type: ACTIONS.ADDRESSES_RELOAD})


export default connect(mapStateToProps, {reloadAddresses})(AppContainer);
