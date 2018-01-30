
import {ACTIONS} from '../actions';

console.log("ACTIONS", ACTIONS);

const initialState = {
    items: [
        {id: 1, firstname: 'Alf', lastname: 'Zuckerbacke', street: 'Alpenstraße 1'},
        {id: 2, firstname: 'Mark', lastname: 'Zuckerschnute', street: 'Bahnhofsgasse 2'},
        {id: 3, firstname: 'Mike', lastname: 'Kaputze', street: 'Gasse 56'},
    ]
}

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
                items: state.items.filter( a => a.id != action.id )
            }
    }

    return state;
}
