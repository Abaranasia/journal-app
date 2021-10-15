import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";

import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";


export const startNewNote = () => { // Acción para crear una nueva nota
    return async (dispatch, getState) => { //comunicación asíncrona con Thunk 

        const uid = getState().auth.uid;
        //console.log(uid)

        const newNote = {
            title: 'Otra nueva nota',
            body: 'jujijaje',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote); // referencia al documento en Firestore donde añadir una nueva nota para este usuario
        // console.log(docRef)
        dispatch(activeNote(docRef.id, newNote))
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => { // acción asíncrona porque depende del backend

        const notes = await loadNotes(uid); // obtenemos todas las notas del usuario identificado y las enviaremos al store
        dispatch(setNotes(notes)) //hacemos el dispatch para enviar el listado de notas al store mediante la acción setNotes
    }
}


export const setNotes = (notes) => ({ // Acción para enviar al store las notas recibidas de Firebase
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => { // Acción para guardar una nota en la BBDD
    // necesitaremos el middleware Thunk para poder comunicarnos con Firebase
    return async (dispatch, getState) => { //Thunk, que es asíncrono, devuelve el dispatch y el uid del usuario

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url; //Para evitar que Firebase pete si le llega un undefined
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id; // Hacemos esto para extraer la id de note, dado que no la necesitamos en la inserción

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore); // Podemos enviar noteToFirestore o note, pro la primera no lleva id, ojo

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved!', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({ // Acción que permite refrescar una nota, en caso de que haya cambiado, por ejemplo, tras guardarla
    type: types.notesUpdated,
    payload: {
        id,
        note: {  // Tenemos que pasarlo así porque este note nos llega sin id al enviar noteToFirestore, asi que lo volvemos a poner
            id, //Sin este este id, jornalEntry nos da un error porque debe dibujar un elemento sin key
            ...note
        }

    }
})

