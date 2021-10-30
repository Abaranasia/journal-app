import { types } from "../types/types";

/** Este módulo es el reducer que gestiona las acciones para el proceso de login y logout */

/**
 * state = {} -> vacio cuando no se está autenticado
  state = {
           uid: 1028201,
           name: "ran"
          }
 */


export const authReducer = (state = {}, action) => {
    switch (action.type) {

        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            }

        case types.logout:
            return {}

        default:
            return state
    }

}