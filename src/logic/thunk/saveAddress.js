
import {ACTIONS} from 'AdressBook/src/logic/actions';

function reloadAddresses() {
    return dispatch => {
        
    }
}

export default function saveAddress(address) {
    return async dispatch => {

        dispatch({type: ACTIONS.STATE_SAVING, saving: true})

        await timeout(1000);

        // dispatch({type: ACTIONS.ADDRESS_ADD, address})

        dispatch({type: ACTIONS.STATE_SAVING, saving: false})

        dispatch(reloadAddresses)


    }
}



function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
