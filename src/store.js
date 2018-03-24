import { createStore, combineReducers } from "redux";

export const initializeSession = ( ) => ( {
    type: "INITIALIZE_SESSION",
} );

const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
} );

export default ( initialState ) => createStore( reducer, initialState );
