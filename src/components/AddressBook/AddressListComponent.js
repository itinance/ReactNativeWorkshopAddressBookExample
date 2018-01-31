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

import Spinner from 'react-native-loading-spinner-overlay';

export default class AddressListComponent extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        }
    }

    componentDidMount() {

        setTimeout( () => this.props.setGlobalError( 'Error XYZ'), 500 )
        
    }

    componentWillReceiveProps(nextProps) {
        console.log("RECEIVE ", nextProps)

        if(this.props.loading === true && ! nextProps.loading) {
            this.setState({refreshing: false})
        }
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

    doRefresh = () => {
        console.log("REFRESHING****************************")

        this.setState({refreshing: true})
        this.props.reloadAddresses();
    }

    render() {
        return (
        <View style={styles.container}>
            <FlatList 
                refreshing={this.state.refreshing}
                onRefresh={this.doRefresh}
                data={this.props.addresses}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderRow}
                ItemSeparatorComponent={this.renderSeparator}
            />
            <Spinner visible={this.props.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
