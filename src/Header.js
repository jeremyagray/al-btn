/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './Header.css';

function Header() {
  return (
    <header className="AppHeader">
      <Navbar>
        <Container>
          <Navbar.Brand href="#">
            Alabama:  By the Numbers
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
