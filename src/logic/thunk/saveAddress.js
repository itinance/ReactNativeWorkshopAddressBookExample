import {Alert} from 'react-native';
import {ACTIONS} from 'AdressBook/src/logic/actions';

import * as Database from 'AdressBook/src/data/database';

export function reloadAddresses() {
    return async dispatch => {
        dispatch({type: ACTIONS.STATE_LOADING, loading: true})

        await timeout(1000);

        Database.loadAddresses()
        .then( addresses => {
            dispatch({type: ACTIONS.ADDRESSES_ASSIGN, addresses}) 
            dispatch({type: ACTIONS.STATE_LOADING, loading: false})
        })
        .catch( err => {
            console.log(err)
            dispatch({type: ACTIONS.STATE_LOADING, loading: false})
        })
    }
}

export function saveAddress(address, callback) {
    return async dispatch => {
        dispatch({type: ACTIONS.STATE_SAVING, saving: true})

        const isNew = ! address.id
        const func = isNew ? Database.insertAddress : Database.updateAddress;

        func(address)
        .then( ({success, id}) => {
            __DEV__ && console.log('New ID: ', id)
            dispatch({type: ACTIONS.STATE_SAVING, saving: false})
            if(isNew) {
                address.id = id;
            }
            if(success) {
                dispatch({type: isNew ? ACTIONS.ADDRESS_ADD : ACTIONS.ADDRESS_EDIT, address});
                callback && callback()
            }
        })
        .catch( err => {
            __DEV__ && console.log(err);
            dispatch({type: ACTIONS.STATE_SAVING, saving: false})
            Alert.alert('Error', err)
        })
    }
}

export function deleteAddress(id) {
    return async dispatch => {
        dispatch({type: ACTIONS.STATE_SAVING, saving: true})
        
        Database.deleteAddress(id)
        .then( success => {
            __DEV__ && console.log('A', success)
            dispatch({type: ACTIONS.STATE_SAVING, saving: false})
            success && dispatch({type: ACTIONS.ADDRESS_REMOVE, id})
        })
        .catch( err => {
            __DEV__ && console.log(err);
            dispatch({type: ACTIONS.STATE_SAVING, saving: false})
            Alert.alert('Error', err)
        })        
    }
}


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
