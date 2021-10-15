import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //middleware para apis externas como Firebase

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';


/** Store es el módulo que concentra los reducers y dirige la comunicación entre actions y reducers */

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
}
    /* createStore solo admite un reducer, por lo que empleamos 
    esta función para combinar todos los que tenemos.
    A esta función también se la suele conocer coo route-reducer */
)

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/**  composeEnhancers comprueba si se está o no aplicando un  middleware*/


export const store = createStore(
    reducers,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(
        applyMiddleware(thunk)
    )
);