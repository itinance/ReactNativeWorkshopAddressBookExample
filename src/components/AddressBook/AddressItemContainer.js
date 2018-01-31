import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';

import {ACTIONS} from 'AdressBook/src/logic/actions';

import AddressItemComponent from './AddressItemComponent';

import saveAddress from 'AdressBook/src/logic/thunk/saveAddress';

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
  
const addAddress = (address) => dispatch => dispatch({type: ACTIONS.ADDRESS_ADD, address})
const editAddress= (address) => dispatch => dispatch({type: ACTIONS.ADDRESS_EDIT, address})
const deleteAddress = (id) => dispatch => dispatch({type: ACTIONS.ADDRESS_REMOVE, id})

export default connect(mapStateToProps, {saveAddress, addAddress, editAddress, deleteAddress})(AddressItemContainer);
