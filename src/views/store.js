import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import fetch from "isomorphic-fetch"

function fetchCircuits( ) {
  /* tried out hardcoding to see how the perf was...
  let res = {"MRData":{"xmlns":"http://ergast.com/mrd/1.4","series":"f1","url":"http://ergast.com/api/f1/2018/circuits.json","limit":"30","offset":"0","total":"21","CircuitTable":{"season":"2018","Circuits":[{"circuitId":"albert_park","url":"http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit","circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968","locality":"Melbourne","country":"Australia"}},{"circuitId":"americas","url":"http://en.wikipedia.org/wiki/Circuit_of_the_Americas","circuitName":"Circuit of the Americas","Location":{"lat":"30.1328","long":"-97.6411","locality":"Austin","country":"USA"}}]}}}
  return Promise.resolve(res.MRData.CircuitTable.Circuits)
        */
    return fetch( "http://ergast.com/api/f1/2018/circuits.json" )
        .then( res => res.json( ) )
        .then( res => res.MRData.CircuitTable.Circuits );
}

export const initializeSession = ( ) => ( {
    type: "INITIALIZE_SESSION",
} );

const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );

export const fetchData = ( ) => ( dispatch ) =>
    fetchCircuits( ).then( res => dispatch( storeData( res ) ) );

const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

const dataReducer = ( state = [ ], action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return action.data;
        default: return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
    data: dataReducer,
} );

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
