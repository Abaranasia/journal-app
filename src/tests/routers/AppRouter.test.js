import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebaseConfig';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import Swal from 'sweetalert2';

import { getAuth } from 'firebase/auth';
const auth = getAuth();
//Evita el crasheo de tipo: INTERNAL ASSERTION FAILED: Expected a class definition en  firebase.auth()

jest.mock('../../actions/auth', () => ({
    // Mockeamos esta función porque en el test no pretende evaluarla
    login: jest.fn(),
})
);

jest.mock('sweetalert2', () => ({
    // Mockeamos la función fire de sweetAlert para evitar el crasheo con el test
    fire: jest.fn(),
})
);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = { //Debe tener el estado inicial, el que nos encontraremos antes de hacer login 
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',

        },
        notes: []
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test
store.dispatch = jest.fn(); // Mokeamos el dispatch porque necesitamos evaluarlo aquí



describe('<AppRouter /> tests', () => {

    test('login should be called when user is autenticated ', async () => {

        let user;

        await act(async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123ABC')
            user = userCred.user;
            //console.log("user", userCred)
            const wrapper = mount(
                <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
                    <MemoryRouter> {/* Lo necesitamos para que asuma la ruta de react-router */}
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(login).toHaveBeenCalled
        expect(login).toHaveBeenCalledWith('RJxKzCmXuYfGuQ5OMujOBbDQZzn2', null)
    });

});