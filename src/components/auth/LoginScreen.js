import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {


    const dispatch = useDispatch(); // gestiona el dispatch de redux


    const [formValues, handleInputChange] = useForm({ //useForm
        email: 'rankirlian@gmail.com',
        password: 'abc123'
    });

    const { email, password } = formValues;


    const handleLogin = (e) => { // para login con email y password
        e.preventDefault();
        console.log(email, password);
        //dispatch(login(1028201, 'Ran'))
        dispatch(startLoginEmailPassword(email, password))
    }


    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>
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
