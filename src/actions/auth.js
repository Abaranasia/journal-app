import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import Swal from 'sweetalert2';

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

/** Este módulo define los actions para el proceso de auth.
 *  Aquí incluiríamos todos los métodos de acceso necesarios: email, google, twitter, etc.
 */


export const startLoginEmailPassword = (email, password) => {
    // middleware para login con email que gestiona el action de login

    return (dispatch) => { //devuelve un objeto llamado dispatch con el tipo y el payload

        dispatch(startLoading()); // Empieza el procedimiento de login

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch(finishLoading()); // Finaliza el procedimiento de login 
            })
            .catch(e => {
                console.log('Hubo un error en el login:', e);
                dispatch(finishLoading()); // Finaliza el procedimiento de login 
                Swal.fire('Error', e.message, 'error')
            });
/*         setTimeout(() => {
            dispatch(login(123, 'Pedro'))
        }, 3500); */

    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
    // dado que es ua tarea asíncrona, necesito retornar un callback
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name }); // hacemos esto porque el registro en Firebase no lo hace solo
                console.log(user);

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => { console.log('Hubo un error al registrarse:', e) });
    }
}

export const startGoogleLogin = () => {
    // middleware para login con usuario de Google que gestiona el action de login

    return (dispatch) => { //devuelve un objeto llamado dispatch con eltipo y el payload

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                //console.log(user.uid, user.displayName);
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}


export const login = (uid, displayName) => {
    //action para login: devuelve un tipo (login) y un payload con uid y nombre

    return {
        type: types.login,
        payload: {
            uid, displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout())
    }
}
export const logout = (params) => ({
    type: types.logout
})
