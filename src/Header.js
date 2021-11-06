/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Router.
import {
  Link
} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import './Header.css';

const Header = (props) => {
  console.log(`Header.js:token: ${props.token}`);
  if (props.token) {
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
                <NavDropdown
                  alignRight
                  title="Account"
                  id="albtn-navbar-account-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/logout">
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/password/reset">
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
              <NavDropdown
                alignRight
                title="Account"
                id="albtn-navbar-account-dropdown"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Register
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/password/reset">
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
