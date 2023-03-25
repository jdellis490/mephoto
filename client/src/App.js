import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

// //Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({ uri: 'graphql', });

// //Requests middleware that attaches JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // Get auth token from local storage if exists
//   const token = localStorage.getItem('id_token');
//   // Return headers to the context so httpLink can read
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// // Set up client to execute the `authLink` middleware prior to making the request to GraphQL API
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    // <ApolloProvider client={client}>
    <div> 
      <Header />
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome to Neupixl
      </p>
      <p className="text-gray-500 text-lg">
        Let's get started!
      </p>
    </div>
    </div>
    // </ApolloProvider>
  );
}
export default App;