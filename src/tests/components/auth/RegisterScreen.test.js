import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

/* import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
 */

/* jest.mock('../../../actions/auth', () => ({
    // Mockeamos esta función porque en el test no pretende evaluarla
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
})
); */


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = { //Debe tener el estado inicial, el que nos encontraremos antes de hacer login 
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test

//store.dispatch = jest.fn(); // No necesitamos simular el dispatch porque es todo síncrono


describe('<RegisterScreen> tests', () => {
    /* 
        beforeEach(() => { //Reiniciamos el store porque conserva los estados anteriores
            store = mockStore(initState);
            jest.clearAllMocks
        }) */

    const wrapper = mount(
        <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
            <MemoryRouter> {/* Lo necesitamos para que asuma la ruta de react-router */}
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    )


    test('component should render properly', () => {
        expect(wrapper).toMatchSnapshot()
    });


    test('should dispatch the properly action', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { } // le pasamos la función porque si no se queja. Pasa siempre que sea empleada
        });

        const actions = store.getActions();
        // console.log(actions)
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'email is required'
        })
    });

    test('should show error alert', () => {

        const initState = { //Debe tener el estado inicial, el que nos encontraremos antes de hacer login 
            auth: {},
            ui: {
                loading: false,
                msgError: 'email is required'
            }
        }
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
                <MemoryRouter> {/* Lo necesitamos para que asuma la ruta de react-router */}
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
    });
});