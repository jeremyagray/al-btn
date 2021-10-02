/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import './Header.css';

function Header() {
  return (
    <header className="AppHeader">
      <Navbar
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/" className="d-none d-sm-block">
            Alabama:  By the Numbers
          </Navbar.Brand>
          <Navbar.Brand href="/" className="d-small d-md-none">
            AL:  BTN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/contact">
                Contact
              </Nav.Link>
              <NavDropdown
                alignRight
                title="Account"
                id="albtn-navbar-account-dropdown"
              >
                <NavDropdown.Item href="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item href="/register">
                  Register
                </NavDropdown.Item>
                <NavDropdown.Item href="/password/reset">
                  Reset Password
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
