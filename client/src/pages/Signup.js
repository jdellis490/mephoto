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
      <div className="max-w-xl mx-auto py-12 md:max-w-4x1 ">
        <div className="py-12">
          <h2 className="text-4xl font-bold">Signup</h2>
          <form
            className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl"
            onSubmit={formSubmit}
          >
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-800">Username:</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                  name="username"
                  value={formState.name}
                  onChange={handleChange}
                ></input>
              </label>
              <label className="block">
                <span className="text-gray-800">Email Address:</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                  placeholder="adam@example.com"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                ></input>
              </label>
              <label className="block">
                <span className="text-gray-800">Password:</span>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                  placeholder="**********"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <br />
            {error ? (
              <div>
                <p className="text-red-500 italic bg-red-100 rounded p-1">
                  {" "}
                  Please enter valid credentials.
                </p>
              </div>
            ) : null}
            <div className="mt-5">
              <button
                className="inline-block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white"
                type="submit"
                style={{ cursor: "pointer" }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
