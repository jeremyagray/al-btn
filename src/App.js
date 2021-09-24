/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import './App.css';

import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
