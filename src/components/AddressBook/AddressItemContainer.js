import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';

import {ACTIONS} from 'AdressBook/src/logic/actions';

import AddressItemComponent from './AddressItemComponent';

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

});
  
const mapActionsToProps = (dispatch, ownProps) => ({
    addAddress: (address) => dispatch({type: ACTIONS.ADDRESS_ADD, address}),
    editAddress: (address) => dispatch({type: ACTIONS.ADDRESS_EDIT, address}),
    deleteAddress: (id) => dispatch({type: ACTIONS.ADDRESS_REMOVE, id}),
});
  
export default connect(mapStateToProps, mapActionsToProps)(AddressItemContainer);
