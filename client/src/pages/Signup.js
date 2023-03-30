import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
        <div className="py-12">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-800">Username:</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                ></input>
              </label>
              <label className="block">
                <span className="text-gray-800">Email Address:</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                  placeholder="adam@example.com"
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
        <p className="inline block text-sm font-bold px-4 py-2 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
          Sign Up
        </p>
        {' '}or{' '}
        <Link to="/login"><p className="inline block text-sm font-bold px-4 py-2 border rounded border-neutral-500 hover:bg-neutral-500 hover:text-white">
          Login
        </p></Link>
      </div>
    </div>
  );
};

export default Signup;
