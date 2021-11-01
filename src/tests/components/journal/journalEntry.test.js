import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { JournayEntry } from '../../../components/journal/JournayEntry';
import { activeNote } from '../../../actions/notes';

//import { firebase } from '../../firebase/firebaseConfig';


//import { getAuth } from 'firebase/auth';
//const auth = getAuth();

//Evita el crasheo de tipo: INTERNAL ASSERTION FAILED: Expected a class definition en  firebase.auth()



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = {}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test
store.dispatch = jest.fn(); // Mokeamos el dispatch porque necesitamos evaluarlo aquí

const note = {
    id: 123,
    date: 0,
    title: 'testing',
    body: 'body test',
    url: 'https://testing.com/foto.jpg'

}

const wrapper = mount(
    <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
        <JournayEntry {...note} />
    </Provider>
)

describe('JournayEntry tests', () => {


    test('should render properly', () => {
        expect(wrapper).toMatchSnapshot()
    });


    test('should activate the note', () => {

        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, { ...note })
        );
    });
});