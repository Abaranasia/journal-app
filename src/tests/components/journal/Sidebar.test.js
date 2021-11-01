import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
//import { firebase } from '../../firebase/firebaseConfig';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

//import { getAuth } from 'firebase/auth';
//const auth = getAuth();

//Evita el crasheo de tipo: INTERNAL ASSERTION FAILED: Expected a class definition en  firebase.auth()


jest.mock('../../../actions/auth', () => ({
    // Mockeamos estas funciones porque ya están probadas y no necesitamos volver a hacerlo aquí
    startLogout: jest.fn(),
})
);

jest.mock('../../../actions/notes', () => ({
    // Mockeamos estas funciones porque ya están probadas y no necesitamos volver a hacerlo aquí
    startNewNote: jest.fn(),
})
);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = { //Debe tener el estado inicial, el que nos encontraremos antes de hacer login 
    auth: {
        udi: "1",
        name: "Ran"
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test
store.dispatch = jest.fn(); // Mokeamos el dispatch porque necesitamos evaluarlo aquí


const wrapper = mount(
    <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
        <Sidebar />
    </Provider>
)

describe('<Sidebar /> Tests', () => {


    test('should render properly', () => {
        expect(wrapper).toMatchSnapshot()
    });



    test('should call logout action on click', () => {
        wrapper.find('button').prop('onClick')();

        expect(startLogout).toHaveBeenCalled()
    });



    test('should call startnewNote on click', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNote).toHaveBeenCalled()
    });
});