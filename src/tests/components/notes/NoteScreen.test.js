import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
//import { firebase } from '../../firebase/firebaseConfig';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


//import { getAuth } from 'firebase/auth';
//const auth = getAuth();

//Evita el crasheo de tipo: INTERNAL ASSERTION FAILED: Expected a class definition en  firebase.auth()


jest.mock('../../../actions/notes', () => ({
    // Mockeamos esta función porque ya está probada y no necesitamos volver a hacerlo aquí
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            title: "test active note",
            body: "test body",

        },
        notes: []
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test
store.dispatch = jest.fn(); // Mokeamos el dispatch porque necesitamos evaluarlo aquí

const wrapper = mount(
    <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
        <NoteScreen />
    </Provider>
)


describe('NoteScreen tests', () => {


    test('should render the component properly', () => {
        expect(wrapper).toMatchSnapshot()
    });


    test('should run activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            // Usamos toHaveBeenLastCalledWith porque en su primera ejecución dará un resultado distinto, el inicial, y peta
            1234,
            {
                body: 'test body',
                title: 'Hola de nuevo',
                id: 1234
            }
        );

    });
});