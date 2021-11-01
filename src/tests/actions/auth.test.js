import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import '@testing-library/jest-dom';
import { firebase, googleAuthProvider } from "../../firebase/firebaseConfig";


import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';

import { getAuth } from 'firebase/auth';
const auth = getAuth();
//Evita el crasheo de tipo: INTERNAL ASSERTION FAILED: Expected a class definition en  firebase.auth()

/* jest.mock('../../firebase/firebaseConfig', () => ({
    signInWithEmailAndPassword: jest.fn()
})) */

jest.mock('firebase/app', () => {
    return {
        auth: jest.fn(),
    };
})



/**
 * @jest-environment node
 */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = {}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test

describe('Auth actions tests', () => {

    beforeEach(() => { //Reiniciamos el store porque conserva los estados anteriores
        store = mockStore(initState);
    })


    test('login and logut should create their own actions', () => {

        const uid = "ABC123";
        const displayName = 'Ran';

        const loginAction = login(uid, displayName);
        const logoutAction = logout()

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        })
    });


    test('startLogout should work ', async () => {

        await store.dispatch(startLogout());
        const actions = store.getActions();
        // console.log(actions)

        expect(actions[0]).toEqual({
            type: types.logout
        })

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    });


    test('should init startLoginEmailPassword', async () => {

        await store.dispatch(startLoginEmailPassword('test@testing.com', '123ABC'));
        const actions = store.getActions();
        //console.log(actions)

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'RJxKzCmXuYfGuQ5OMujOBbDQZzn2',
                displayName: null
            }
        })
    });
});