import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_IMAGECARD } from "../utils/mutations";
import { QUERY_IMAGECARDS } from "../utils/queries";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });

  const [addImageCard, { error }] = useMutation(ADD_IMAGECARD, {
    update(cache, { data: { addImageCard } }) {
      try {
        const imageCards = cache.readQuery({ query: QUERY_IMAGECARDS });
        cache.modify({
          query: QUERY_IMAGECARDS,
          data: { imageCards: [addImageCard, imageCards] },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleFileChange = ({ target }) => {
    setImageData(target.files[0]);
    console.log(target.files[0]);
    setImage(target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const formSubmit = async (event) => {
    event.preventDefault();

    if (formState.title === "" || formState.description === "") {
      return alert("Must provide title and description!");
    }

    //Upload preset used from Cloudinary API
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    // Axios for json parsing to object, easier use with asnyc/awat syntax, and built in error handling over fetch
    await Axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    ).then((res) => {
      console.log(res.data.secure_url);
      // Gets image url from stored Cloudinary image and adds to mutation
      const imageUrl = res.data.secure_url;
      try {
        const { data } = addImageCard({
          variables: {
            imageUrl: imageUrl,
            title: formState.title,
            description: formState.description,
            // Add Image mutation won't work unless author has auth
            imageAuthor: Auth.getProfile().data.username,
          },
        });
      } catch (error) {
        console.error(error);
      }
      setImage("");
      setFormState({ title: "", description: "" });
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <div>
      <div className="antialiased text-gray-900 px-6">
        <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
          <div className="py-12">
            <h2 className="text-3xl font-bold">Upload an Image!</h2>
            {Auth.loggedIn() ? (
              <form
                className="mt-8 px-5 py-5 pb-10 max-w-md bg-neutral-300 border border-neutral-800 rounded-xl"
                onSubmit={formSubmit}
              >
                <div className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <span className="text-gray-800">Choose an image</span>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleFileChange}
                      name="file"
                      accept="image/*"
                      value={image}
                    ></input>
                  </label>
                  <label className="block">
                    <span className="text-gray-800">Title:</span>
                    <input
                      type="text"
                      name="title"
                      value={formState.title}
                      className="mt-1 block w-full rounded-md border-neutral-800 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <label className="block">
                    <span className="text-gray-800">Description:</span>
                    <textarea
                      className="form-textarea mt-1 block w-full h-24 rounded-md border-neutral-800 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
                      rows="3"
                      name="description"
                      value={formState.description}
                      placeholder="Enter your description"
                      onChange={handleChange}
                    ></textarea>
                  </label>
                  <button
                    className="inline block text-md font-bold px-5 py-3 text-lg border rounded border-neutral-800 bg-gradient-to-r from-lime-300 to-lime-500 text-neutral-800 hover:from-neutral-400 hover:to-neutral-700 hover:text-white"
                    type="submit"
                  >
                    Upload!
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 italic bg-red-100 rounded p-1 mt-1">
                    {error ? "Unable to upload" : error.message}
                  </div>
                )}
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
