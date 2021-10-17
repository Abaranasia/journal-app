import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

    /** Este módulo tiene acceso a useDispatch e invoca, dependiendo de la vía de acceso,
     * al action correspondiente para cada forma de acceso, ya que alguno requiere middleware */


    const dispatch = useDispatch(); // gestiona el dispatch de redux

    const { loading } = useSelector(state => state.ui) // Esto nos permite identificar si cuándo se está haciendo login

    const [formValues, handleInputChange] = useForm({ //useForm
        email: 'rankirlian@gmail.com',
        password: 'abc123'
    });

    const { email, password } = formValues;


    const handleLogin = (e) => { // para login con email y password
        e.preventDefault();
        //console.log(email, password);
        //dispatch(login(1028201, 'Ran'))
        dispatch(startLoginEmailPassword(email, password)) // recibe type y payload para enviar al dispatcher
    }


    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin()); // recibe type y payload para enviar al dispatcher
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    className="auth__input"
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    className="auth__input"
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    Login
                </button>

                <br />
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register">
                    Create new account
                </Link>
            </form>
        </>
    )
}
