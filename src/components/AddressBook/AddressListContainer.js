import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';

import {reloadAddresses} from 'AdressBook/src/logic/thunk/saveAddress';

import AddressListComponent from './AddressListComponent';

class AddressListContainer extends Component<{}> {

  constructor(props) {
    super(props);
    
  }

  render() {    
      return (
          <AddressListComponent {...this.props} />
      )
  }

}

const mapStateToProps = (state, ownProps) => ({
    addresses: state.addressView.items,
    loading: state.addressView.loading,
});

export default connect(mapStateToProps, {reloadAddresses})(AddressListContainer);
