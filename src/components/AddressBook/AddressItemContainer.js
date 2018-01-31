import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';

import {ACTIONS} from 'AdressBook/src/logic/actions';

import AddressItemComponent from './AddressItemComponent';

import {saveAddress, deleteAddress} from 'AdressBook/src/logic/thunk/saveAddress';

class AddressItemContainer extends Component<{}> {

  constructor(props) {
    super(props);
    
  }

  render() {    
      return (
          <AddressItemComponent {...this.props} />
      )
  }
}

const mapStateToProps = (state, ownProps) => ({
    saving: state.addressView.saving,
});
  
export default connect(mapStateToProps, {saveAddress, deleteAddress})(AddressItemContainer);
