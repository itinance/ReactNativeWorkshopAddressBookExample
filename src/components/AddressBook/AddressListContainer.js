import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';

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
});
  
  const mapActionsToProps = (dispatch, ownProps) => ({
      doTest: () => dispatch({type: 'test'})
  });
  
export default connect(mapStateToProps, mapActionsToProps)(AddressListContainer);
