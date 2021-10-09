import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';

const reducers = combineReducers({
    auth: authReducer
}
    /* createStore solo admite un reducer, por lo que empleamos 
    esta función para combinar todos los que tenemos */
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