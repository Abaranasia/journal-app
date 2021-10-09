import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types"


export const startLoginEmailPassword = (email, password) => {
    //action middleware para login con email

    return (dispatch) => {

        setTimeout(() => {
            dispatch(login(123, 'Pedro'))
        }, 3500);

    }
}

export const startGoogleLogin = () => {
    //action middleware para login con usuario de Google

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                console.log(user.uid, user.displayName);
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid, displayName) => {
    //action para login

    return {
        type: types.login,
        payload: {
            uid, displayName
        }
    }
}