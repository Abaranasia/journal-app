import { notesReducer } from '../../reducers/notesReducer'
import { types } from '../../types/types';


describe('notesReducer tests', () => {

    test('should return an active note', () => { // Nota activa

        const initialState = {};

        const newNote = {
            id: 123,
            title: 'Otra nueva nota',
            body: 'jujijaje',
            date: new Date().getTime(),
            url: "abc.jpg"
        };

        const activeNote = {
            active: {
                id: 123,
                title: 'Otra nueva nota',
                body: 'jujijaje',
                date: new Date().getTime(),
                url: "abc.jpg"
            }
        };

        const action = {
            type: types.notesActive,
            payload: newNote
        };

        const state = notesReducer(initialState, action);

        //console.log(state)
        expect(state).toEqual(activeNote)
    });

    // Faltan 6 test más para comprobar todos los reducers
});