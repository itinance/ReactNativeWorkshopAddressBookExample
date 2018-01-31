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
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import Spinner from 'react-native-loading-spinner-overlay';

export default class AddressItemComponent extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
        id: props.id || 0,
        firstname: props.firstname || '',
        lastname: props.lastname || '',
        street: props.street || '',
        plz: props.plz || '',
    }
  }

  setField = (name, value) => {
      __DEV__ && console.log("Set " + name + ' to ' + value)

      this.setState({[name]: value})
  }

  buildAddressFromState() {
    const {id, firstname, lastname, street, plz} = this.state;
    return {
        id,
        firstname,
        lastname,
        street,
        plz
    }
  }

  save = () => {
    const address = this.buildAddressFromState();

    this.props.saveAddress( address, Actions.pop )
  }

  delete = () => {
    this.props.deleteAddress( this.state.id );
    Actions.pop();
  }

  render() {
      console.log("Render", this.props)
    

    return (
      <View style={styles.container}>

        

        <View style={styles.inputRow}>
            <Text>Firstname</Text>
            <TextInput key="firstname"
                style={styles.input} 
                value={this.state.firstname}
                onChangeText={ value => this.setField('firstname', value)}
            />
        </View>

        <View style={styles.inputRow}>
            <Text>Lastname</Text>
            <TextInput 
                style={styles.input} 
                value={this.state.lastname}            
                onChangeText={ value => this.setField('lastname', value)}
            />
        </View>

        <View style={styles.inputRow}>
            <Text>Street</Text>
            <TextInput 
                style={styles.input} 
                value={this.state.street}            
                onChangeText={ value => this.setField('street', value)}
            />
        </View>

        <View style={styles.inputRow}>
            <Text>Plz</Text>
            <TextInput 
                style={styles.input} 
                value={this.state.plz}            
                onChangeText={ value => this.setField('plz', value)}
            />
        </View>

        <View style={styles.buttonBar}> 
            <TouchableOpacity onPress={this.save} style={styles.saveBtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.delete} style={styles.deleteBtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.pop} style={styles.cancelBtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>
        </View>

        <Spinner visible={this.props.saving} textContent={"One Moment please..."} textStyle={{color: '#FFF'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  inputRow: {
    width: '80%',
    marginBottom: 20,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  saveBtn: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'blue',
  },
  deleteBtn: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'red',
  },
  cancelBtn: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'gray',
  },
  input: {
    height: 40,
    backgroundColor: 'lightgray',
  },
});
