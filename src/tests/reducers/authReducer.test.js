import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types';


describe('AuthReducer tests', () => {

    test('should login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 1028201,
                displayName: "Ran"
            }
        };

        const state = authReducer(initState, action);
        //console.log(state);

        expect(state).toEqual(
            {
                uid: 1028201,
                name: "Ran"
            }
        )
    });


    test('should logout', () => {

        const initState = {
            uid: 1028201,
            name: "Ran"
        };
        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);
        //console.log(state);
        expect(state).toEqual({})
    });


    test('should run default option', () => {

        const initState = {
            uid: 1028201,
            name: "Ran"
        };
        const action = {
            type: 'trash' //acción no definida para evaluar el default
        };

        const state = authReducer(initState, action);
        expect(state).toEqual(initState)
    });
});