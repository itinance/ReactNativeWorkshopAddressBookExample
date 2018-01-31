import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// const DEVICE_WIDTH = Dimensions.get('window').width;

export default class AddressCardComponent extends Component<{}> {

  constructor(props) {
    super(props);
  }

  render() {    
      const {id, firstname, lastname, street, plz} = this.props;

      return (
          <View style={styles.container}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.name}>{lastname} {firstname}</Text>
              <Text style={styles.address}>{street} {plz}</Text>
            </View>
            <Icon name="chevron-right" size={12} color="gray" />
          </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    

    justifyContent: 'space-between',
    alignItems: 'center',
    
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
