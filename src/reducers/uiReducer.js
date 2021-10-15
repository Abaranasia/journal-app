import { types } from "../types/types";
/** Este módulo es el reducer que gestiona el estado de los posibles errores de la app,
 * como los provocados por entradas erróneas durante el proceso de registro */

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiSetError: // para mostrar errores durante el proceso de registro
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError: // para limpiar errores durante el proceso de registro
            return {
                ...state,
                msgError: null
            }
        case types.uiStartLoading: // establece que se está procediendo a hacer login
            return {
                ...state,
                loading: true
            }
        case types.uiFinishLoading: // establece que se ha finalizado el proceso de login
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}