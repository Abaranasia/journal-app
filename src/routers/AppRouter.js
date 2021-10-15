import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux';

import { PrivateRoute } from './PrivateRoute'; // Gestiona las rutas con  autenticación
import { PublicRoute } from './PublicRoute'; // Gestiona las rutas sin autenticación

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // comprueba que el usuario esta logueado y tiene acceso a la app, si no debe ir a la página de login


    useEffect(() => { // este hook nos permite recordar al usuario logueado
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName)); // hacemos login con el uid y el nombre del usuario
                setIsLoggedIn(true); // establecemos que está logueado

                dispatch(startLoadingNotes(user.uid)) //hacemos el dispatch para enviar el listado de notas al store mediante la acción startLoadingNotes

            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
            //console.log(user)
        })
    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (<h2>Wait...</h2>)
    }
    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter} /> */}
                    {/* <Route path="/" exact component={JournalScreen} /> */}

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
