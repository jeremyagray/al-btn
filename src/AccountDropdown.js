/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Router.
import {
  Link
} from 'react-router-dom';

import NavDropdown from 'react-bootstrap/NavDropdown';

import './AccountDropdown.css';

const AccountDropdown = (props) => {
  if (props.token) {
    return (
      <NavDropdown
        align="end"
        title="Account"
        id="albtn-navbar-account-dropdown"
      >
        <NavDropdown.Item
          as={Link}
          to="/logout"
          className="text-end"
        >
          Logout
        </NavDropdown.Item>
        <NavDropdown.Item
          as={Link}
          to="/password/reset"
          className="text-end"
        >
          Reset Password
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown
      align="end"
      title="Account"
      id="albtn-navbar-account-dropdown"
    >
      <NavDropdown.Item
        as={Link}
        to="/login"
        className="text-end"
      >
        Login
      </NavDropdown.Item>
      <NavDropdown.Item
        as={Link}
        to="/register"
        className="text-end"
      >
        Register
      </NavDropdown.Item>
      <NavDropdown.Item
        as={Link}
        to="/password/reset"
        className="text-end"
      >
        Reset Password
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default AccountDropdown;
