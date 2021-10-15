import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);
    /** El hook useSelecto permite redirigir info desde el Store a la app
     * Aquí recibe el state de store y lo leemos para poder usar el mensaje de error */
    console.log(msgError)

    const [formValues, handleInputChange] = useForm({
        name: 'Ran Kirlian',
        email: 'rankirlian@gmail.com',
        password: 'abc123',
        password2: 'abc123'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            //console.log(name, email, password, password2);
            dispatch(startRegisterWithEmailPassword(email, password, name))
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            //console.log('Name is required');
            return false;
        } //else if (email... contra validator.js) {}
        else if (email.trim().length === 0) {
            dispatch(setError('email is required'));
            //console.log('email is required');
            return false;
        } else if (password !== password2 || password.length < 3) {
            dispatch(setError('password missmatch or malformed'));
            //console.log('password missmatch or malformed');
            return false;
        }
        dispatch(removeError())
        return true
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                {msgError && // Pinta la capa si hay un mensaje de error y en él muestra dicho error
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)
                }

                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    className="auth__input"
                    onChange={handleInputChange}
                />

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

                <input
                    type="password"
                    placeholder="confirm password"
                    name="password2"
                    value={password2}
                    className="auth__input"
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary mb-5"
                >
                    Register
                </button>
                <br />
                <Link to="/auth/login">
                    Already registered?
                </Link>
            </form>
        </>
    )
}