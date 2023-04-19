import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
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
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }

    //Clears form values
    setFormState({ email: "", password: "" });
  };

  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
        <div className="py-12">
          <h2 className="text-2xl font-bold">Login</h2>
          {data ? (
            <p>
              <Link to="/">Homepage</Link>
            </p>
          ) : (
            <form
              className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-800">Email:</span>
                  <input
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  ></input>
                </label>
                <label className="block">
                  <span className="text-gray-800">Password:</span>
                  <input
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                    name="password"
                    type="password"
                    placeholder="**********"
                    value={formState.password}
                    onChange={handleChange}
                  ></input>
                </label>
              </div>
              <br />
              {error ? (
            <div>
              <p className="text-red-500 italic bg-red-100 rounded p-1"> Username or Password is incorrect.</p>
            </div>
          ) : null}
              <div className="mt-5">
                <button
                  className="inline-block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white"
                  type="submit"
                  style={{ cursor: "pointer" }}
                >
                  Login
                </button>
              </div>
            </form>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Login;
