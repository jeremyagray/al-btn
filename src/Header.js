/**
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

// React Router.
import {
  Link
} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import AccountDropdown from './AccountDropdown';

import './Header.css';

const Header = (props) => {
  console.log(`Header.js:token: ${props.token}`);

  return (
    <header className="AppHeader">
      <Navbar
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-none d-md-block">
            Alabama:  By the Numbers
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/" className="d-small d-md-none">
            AL:  BTN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <AccountDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
