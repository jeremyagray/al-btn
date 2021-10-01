/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import {
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Body from './Body.js';
import Contact from './Contact.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Body />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
