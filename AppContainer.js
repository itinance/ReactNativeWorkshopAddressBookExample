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
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

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

  clearError = () => {
    

    if(this.errorBox) {
      this.errorBox.fadeOut().then( () => {
        this.props.clearGlobalError()
      })
    }
  }
  

  render() {
    const {errorMsg} = this.props;

    return (
        <View style={{flex: 1}}>
          <App/>
          {errorMsg ? (
          <Animatable.View style={styles.errorBox} animation="fadeInUp" ref={ c => this.errorBox = c}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <TouchableOpacity onPress={this.clearError}>
              <Text>Close</Text>
            </TouchableOpacity>
          </Animatable.View>
          ) : null}
        </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMsg: state.globalError.message,
});

//const loadAddresses = () => dispatch => dispatch({type: ACTIONS.ADDRESSES_RELOAD})

const clearGlobalError = () => dispatch => dispatch({type: ACTIONS.GLOBAL_ERROR, error: ''})

export default connect(mapStateToProps, {reloadAddresses, clearGlobalError})(AppContainer);

const styles = StyleSheet.create({
  errorBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'red',
    minHeight: 100,
    padding: '5%',
  },

  errorText: {
    color: 'white',
  }
})