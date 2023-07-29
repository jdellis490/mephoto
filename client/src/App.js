import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadForm from "./components/UploadForm";
import SingleImageCard from "./pages/SingleImageCard";

//Construct our main GraphQL API endpoint
const httpLink = createHttpLink({ uri: "/graphql" });

//Requests middleware that attaches JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Get auth token from local storage if exists
  const token = localStorage.getItem("id_token");
  // Return headers to the context so httpLink can read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Set up client to execute the `authLink` middleware prior to making the request to GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
// Custom merge function to combat cache merge error
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          imageCards: {
              keyArgs: false,
              merge(existing = [], incoming, { args }) {
                return [...existing, ...incoming];
              }
            }
        }
      }
    }  
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/imageCards/:imageId" element={<SingleImageCard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
