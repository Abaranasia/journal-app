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
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad: {
            return {
                ...state,
                notes: [...action.payload]
            }
        }
        case types.notesUpdated: {
            // Devuelve las notas, incluyendo aquella que ha sido actualizada
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id // la nota que ha mutado, la señalada por el id en el action
                        ? action.payload.note // devolvemos la nota nueva
                        : note //no ha habido modificación, devolvemos la nota tal como estaba
                )
            }
        }
        default:
            return state;
    }
}
