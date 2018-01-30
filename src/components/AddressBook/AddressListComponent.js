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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import AddressCardComponent from './AddressCardComponent';

import {Actions} from 'react-native-router-flux';

export default class AddressListComponent extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("RECEIVE ", nextProps)
    }

    keyExtractor = (item, index) => item.id

    editAddress = (item) => {
        __DEV__ && console.log('Edit address ', item);

        Actions.editAddress( item );
    }

    renderRow = ({item, _, index}) => {
        return (
            <TouchableOpacity onPress={ () => this.editAddress(item) }>
                <AddressCardComponent {...item} />
            </TouchableOpacity>
        )
    }

    renderSeparator() {
        return (
            <View style={styles.separator}/>
        )
    }

    render() {
        return (
        <View style={styles.container}>
            <FlatList 
                data={this.props.addresses}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderRow}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  separator: {
    width: '90%',
    marginLeft: '5%',
    height: 1,
    backgroundColor: 'lightgray',
  }
});
