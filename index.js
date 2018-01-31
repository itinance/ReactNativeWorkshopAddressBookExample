import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';

import Store from './src/logic/Store';

import AppContainer from './AppContainer';

class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <AppContainer/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('AdressBook', () => App);
