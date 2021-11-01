import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    // Mockeamos esta función porque en el test no pretende evaluarla
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
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
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test
store.dispatch = jest.fn(); // Mokeamos el dispatch porque necesitamos evaluarlo aquí

const wrapper = mount(
    <Provider store={store}> {/* lo necesitamos para fingir el context del usuario */}
        <MemoryRouter> {/* Lo necesitamos para que asuma la ruta de react-router */}
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)


describe('<LoginScreen> Tests', () => {

    beforeEach(() => { //Reiniciamos el store porque conserva los estados anteriores
        store = mockStore(initState);
        jest.clearAllMocks
    })



    test('component should render ', () => {

        expect(wrapper).toMatchSnapshot()
    });



    test('StartGoogleLogin should start when button is clicked ', () => {

        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });



    test('should run startLoginEmailPassword ', () => {

        wrapper.find('form').prop('onSubmit')({
            preventDefault() { } // le pasamos la función porque si no se queja. Pasa siempre que sea empleada
        });

        expect(startLoginEmailPassword).toHaveBeenCalledWith('rankirlian@gmail.com', 'abc123');
    });
});
