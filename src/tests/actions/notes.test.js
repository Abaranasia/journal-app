import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { types } from '../../types/types';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';

import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from '../../helpers/fileUpload';

/**
 * @jest-environment node
 */


jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => { //mockeamos el retorno de esta función
        return Promise.resolve('https://res.cloudinary.com/cosa.jpg') //porque espera una respuesta asíncrona
    })

}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Para evaluar estas pruebas vamos a necesitar que nos ayude el store. Para ello empleamos mockStore, 
// MockStore nos permitirá averiguarlas acciones que lo han disparado, con qué argumentos, etc.

const initState = { // estado inicial con el uid para testing
    auth: {
        uid: 'Testing',
    },
    notes: {
        active: {
            id: '04UeIQy6PDIreIsMa22S',
            title: 'Otra nueva nota',
            body: 'jujijaje'
        }
    }
}

let store = mockStore(initState);
// Nuestro store fictício debe definir aquí el estado inicial en el que necesitamos que esté para estos test



describe('Testing the notes actions', () => {
    // jest.useFakeTimers();

    beforeEach(() => { //Reiniciamos el store porque conserva los estados anteriores
        store = mockStore(initState)
    })


    test('should create a new note with startnewNote', async () => {

        await store.dispatch(startNewNote())
        // Este test da error por los permisos de FireStore porque necesitamos estar autenticados
        // Es un riesgo hacer test contra la BBDD de producción; se recomienda tener una copia para desarrollo
        // Con la BBDD para testing podemos hacer pruebas sin permisos

        const actions = store.getActions();
        //console.log(actions)

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String), // Porque no vamos a conocer el id= 'W2XvCCcVYhl3I450jMaC',
                title: 'Otra nueva nota',
                body: 'jujijaje',
                date: expect.any(Number) // Porque no podemos saber la fecha = 1635068086676
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String), // Porque no vamos a conocer el id= 'W2XvCCcVYhl3I450jMaC',
                title: 'Otra nueva nota',
                body: 'jujijaje',
                date: expect.any(Number) // Porque no podemos saber la fecha = 1635068086676
            }
        });

        // Con cada test guardaremos un registro en la BBDD de testing que deberiamos borrar
        const docId = actions[0].payload.id;
        //console.log(docId)
        await db.doc(`/Testing/journal/notes/${docId}`).delete(); // Esto borra en Firebase
    })


    /*     test('startLoadingNotes should load notes', async () => {
    
            await store.dispatch(startLoadingNotes(initState.auth.uid));
            //Esta acción espera un uid que, en este caso será Testing, el usuario de la BBDD de pruebas en FireStore
            const actions = store.getActions();
    
            expect(actions[0]).toEqual({
                type: types.notesLoad,
                payload: expect.any(Array)
            })
            //console.log(actions)
    
            const expected = {
                id: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                date: expect.any(Number),
            }
    
            expect(actions[0].payload[0]).toMatchObject(expected)
        });
    
    
        test('startSaveNote should save a note', async () => {
            // usar  jest --env=node para que funcione?
    
            const note = {
                id: "04UeIQy6PDIreIsMa22S",
                title: "Otra nueva nota",
                body: "jujijaje"
            };
    
            await store.dispatch(startSaveNote(note));
    
            const actions = store.getActions();
            //console.log(actions)
            expect(actions[0].type).toBe(types.notesUpdated);
    
            const docRef = await db.doc(`/Testing/journal/notes/${note.id}`).get();
    
            expect(docRef.data().title).toBe(note.title);
        });
    
    
        test('startUploading should update the entry url', async () => {
    
            const file = new File([], 'foto.jpg');
            store.dispatch(startUploading(file));
    
            const noteId = initState.notes.active.id;
            console.log(noteId)
            const docRef = await db.doc(`/Testing/journal/notes/04UeIQy6PDIreIsMa22S`).get();
            expect(docRef.data().url).toBe('https://res.cloudinary.com/cosa.jpg')
        }); */
});