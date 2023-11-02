import React from 'react';
import './App.css';
import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
// request: operation => {
//   const token = localStorage.getItem('id_token');

// operation.setContext({
//   headers: {
//     ...headers,
//     authorization: token ? `Bearer ${token}` : ''
//   }
// });
// },
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />

      <Outlet />

    </ApolloProvider>
  );
}

export default App;