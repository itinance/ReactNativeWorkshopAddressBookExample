import {ACTIONS} from '../actions';

const initialState = {
    message: ''
}

export default function(state = initialState, action = undefined) {

    console.log("ACTION:", action)

    switch(action.type) {
        case ACTIONS.GLOBAL_ERROR: {
            return {
                ...state,
                message: action.error,
            }
        }
    }

    return state;
}