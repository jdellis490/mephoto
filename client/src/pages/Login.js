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
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
        <div className="py-12">
          <h2 className="text-2xl font-bold">Log In</h2>
          <div className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-800">Username:</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                ></input>
              </label>
              <label className="block">
                <span className="text-gray-800">Password:</span>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                  placeholder="password"
                ></input>
              </label>
            </div>
          </div>
        </div>
        <p className="inline block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
          Login
        </p>
      </div>
    </div>        
    )
};

export default Login