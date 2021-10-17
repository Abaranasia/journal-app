import { types } from "../types/types";

/*
  {
    notes: [],
    active: null,
    active:  {
        id: 'xx',
        title: '',
        body: ''
        imageUrl: '',
        date: 123
    }  
   }
  }
 */

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = (state = initialState, action) => {
    //Define lo que el store debe hacer en respuesta a una acción concreta

    switch (action.type) {
        case types.notesActive: // Devuelve la nota activa
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case (types.notesAddNew):
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoad: { // Carga todas una nota
            return {
                ...state,
                notes: [...action.payload]
            }
        }
        case types.notesUpdated: {// Devuelve las notas, incluyendo aquella que ha sido actualizada
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id // la nota que ha mutado, la señalada por el id en el action
                        ? action.payload.note // devolvemos la nota nueva
                        : note //no ha habido modificación, devolvemos la nota tal como estaba
                )
            }
        }
        case types.notesDelete: { //Borra la nota indicada que, además, es la nota activa, la cual borramos también del state 
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload) // filtra las notas excluyendo la del payload, es decir, la que queremos borrar
            }
        }
        case types.notesLogoutCleaning: {
            return {
                ...state,
                active: null,
                notes: []
            }
        }
        default:
            return state;
    }
}
