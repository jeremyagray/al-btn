/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Login.css';

function Login() {
  return (
    <div className="AppLogin p-3">
      <h2>
        Login
      </h2>
      <Form className="p-3">
        <Form.Group className="p-3 mb-3" controlId="loginFormEmail">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control required type="email" placeholder="enter email" />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="loginFormPassword">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control required type="password" placeholder="enter password" />
        </Form.Group>

        <Form.Control hidden placeholder="enter a value if you are a spammer" />

        <Button id="loginFormSubmit" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
