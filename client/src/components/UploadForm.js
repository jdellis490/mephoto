import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_IMAGECARD } from "../utils/mutations";
import { QUERY_IMAGECARDS } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const UploadForm = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [addImageCard, { error }] = useMutation(ADD_IMAGECARD, {
    update(cache, { data: { addImageCard } }) {
      try {
        const { imageCards } = cache.readQuery({ query: QUERY_IMAGECARDS });

        cache.writeQuery({
          query: QUERY_IMAGECARDS,
          data: { imageCards: [addImageCard, ...imageCards] },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addImageCard({
        variables: {
          image,
          title,
          description,
          imageAuthor: Auth.getProfile().data.username,
        },
      });
      setImage("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setImage(value);
      setTitle(value);
      setDescription(value);
    }
  };

  return (
    <div>
      <div className="antialiased text-gray-900 px-6">
        <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
          <div className="py-12">
            <h2 className="text-3xl font-bold">Upload an Image</h2>
            {Auth.loggedIn() ? (
              <form className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl">
                <div className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <span className="text-gray-800">Choose and image</span>
                    <input type="file" className="mt-1 block w-full"></input>
                  </label>
                  <label className="block">
                    <span className="text-gray-800">Title:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                    ></input>
                  </label>
                  <label className="block">
                    <span className="text-gray-800">Description:</span>
                    <textarea
                      className="form-textarea mt-1 block w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-lime-300 focus:ring-opacity-50"
                      rows="3"
                      placeholder="Enter your description"
                    ></textarea>
                  </label>
                  <button className="inline block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
                    Upload!
                  </button>
                </div>
              </form>
            ) : (
              <div className="container mt-5 p-5 bg-gray-200 rounded-xl shadow border text-xl">
                <p>
                  Please{" "}
                  <Link
                    className="text-lime-600 underline font-bold"
                    to="/login"
                  >
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link
                    className="text-lime-600 underline font-bold"
                    to="/signup"
                  >
                    Signup
                  </Link>{" "}
                  to upload pictures!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
