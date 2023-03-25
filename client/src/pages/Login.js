import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // Updates state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ 
            ...formState,
            [name]: value,
        });
    };

    // Submits form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = data.login.token;
            Auth.login(token);
        } catch (err) {
            console.log(err);
        }

        //Clears form values
        setFormState({ email: '', password: '' });
    };

    return (
        <div>
            <Link to='/signup'> Click to Signup</Link>

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input placeholder='Enter email address' name='email' type='email' id='email' onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}