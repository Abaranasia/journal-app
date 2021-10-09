import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

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
            console.log(name, email, password, password2);
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('Name is required');
            return false;
        } //else if (email... contra validator.js) {}
        else if (email.trim().length === 0) {
            console.log('email is required');
            return false;
        } else if (password !== password2 || password.length < 3) {
            console.log('password missmatch or malformed');
            return false;
        }

        return true
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                <div className="auth__alert-error">
                    hey
                </div>

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
                <Link to="/auth/register">
                    Already registered?
                </Link>
            </form>
        </>
    )
}