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

import {connect} from 'react-redux';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Stack,
} from 'react-native-router-flux';

import AddressListContainer from './src/components/AddressBook/AddressListContainer'
import AddressItemContainer from './src/components/AddressBook/AddressItemContainer'

class App extends Component<{}> {

  componentDidMount() {
    setInterval( this.props.doTest, 1000 )
  }

  renderRightButton() {
    return (
      <TouchableOpacity onPress={Actions.addAddress} style={styles.rightButton}>
        <Text>+</Text>
      </TouchableOpacity>
    )
  }

  render() {

    console.log(this.props);

    return (
      <Router>
          <Stack key="root">
            <Scene key="main" component={AddressListContainer} title="Addressbook"
              renderRightButton={this.renderRightButton}
            />
            <Scene key="addAddress" component={AddressItemContainer} title="Add new Address"/>
            <Scene key="editAddress" component={AddressItemContainer} title="Edit Address"/>
          </Stack>
      </Router>      
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapActionsToProps = (dispatch, ownProps) => ({
    doTest: () => dispatch({type: 'test'})
});

export default connect(mapStateToProps, mapActionsToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  rightButton: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
