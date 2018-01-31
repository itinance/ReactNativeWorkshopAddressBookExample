
import {ACTIONS} from '../actions';

console.log("ACTIONS", ACTIONS);

const initialState = {
    saving: false,

    items: [
        {id: 1, firstname: 'Alf', lastname: 'Zuckerbacke', street: 'Alpenstraße 1', plz: '06108'},
        {id: 2, firstname: 'Mark', lastname: 'Zuckerschnute', street: 'Bahnhofsgasse 2', plz: '12345'},
        {id: 3, firstname: 'Mike', lastname: 'Kaputze', street: 'Gasse 56', plz: '98765'},
    ]
}

let counter = 0


export default function(state = initialState, action = undefined) {

    console.log("ACTION:", action)

    switch(action.type) {
        case ACTIONS.ADDRESS_ADD:
            return {
                ...state,
                items: [...state.items, action.address]
            }
        case ACTIONS.ADDRESS_REMOVE:
            return {
                ...state,
                items: state.items.filter( a => a.id !== action.id )
            }
        case ACTIONS.ADDRESS_EDIT: {

            const {address} = action;

            let newItems = [ ...state.items ]
            const i = state.items.findIndex( a => a.id === address.id )
            if(i < 0) return state;

            newItems[i] = {...address};

            return {
                ...state,
                items: newItems
            }
        }

        case ACTIONS.STATE_SAVING: {
            return {
                ...state,
                saving: action.saving
            }
        }
    }

    return state;
}
