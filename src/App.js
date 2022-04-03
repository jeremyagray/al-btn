/**
 *
 * dark-blue-yonder, custom view of NWS radar, alert, and weather data
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 */

// React Router.
import {
  Switch,
  Route,
} from "react-router-dom";

import {
  useAuth
} from 'react-oidc-context';

import Body from './Body.js';
import Contact from './Contact.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Register from './Register.js';

import useFetchDataWithToken from './hooks/useFetchDataWithToken';

import './App.css';

export const App = () => {
  const auth = useAuth();

  // if (auth.isAuthenticated) {
  //   console.log(auth);
  //   console.log(`token: ${auth?.user?.id_token}`);
  // } else {
  //   console.log('not authenticated');
  // }

  let helloUrl = 'http://localhost:3002/api/v1/hello/hi';

  const [
    helloData,
    helloLoading,
    helloError
  ] = useFetchDataWithToken(helloUrl, auth?.user?.id_token, {'message': ''});

  console.log(helloData);

  return (
    <div className="App">
      <Header
      />
      <Switch>
        <Route path="/contact">
          <Contact
          />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Body
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
