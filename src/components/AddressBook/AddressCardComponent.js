import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Dimensions,
} from 'react-native';


// const DEVICE_WIDTH = Dimensions.get('window').width;

export default class AddressCardComponent extends Component<{}> {

  constructor(props) {
    super(props);
    
  }

  render() {    
      const {id, firstname, lastname, street} = this.props;

      return (
          <View style={styles.container}>
            <Text style={styles.name}>{lastname} {firstname}</Text>
            <Text style={styles.address}>{street}</Text>
          </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-start',
    alignItems: 'stretch',
    
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },

  name: {
      fontWeight: 'bold',
  },

  address: {
      color: 'gray',
  },
});
