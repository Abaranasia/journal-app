import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = {}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test


describe('<LoginScreen> Tests', () => {

    beforeEach(() => { //Reiniciamos el store porque conserva los estados anteriores
        store = mockStore(initState);
    })

    const wrapper = mount(
        <Provider>
            <LoginScreen />
        </Provider>
    )

    //expect(wrapper).toMachSnapshot();
});