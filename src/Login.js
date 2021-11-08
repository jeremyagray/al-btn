/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  useState
} from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './Login.css';

export const Login = (props) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ sticky, setSticky ] = useState('');
  const [ serverResponse, setServerResponse ] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSticky = (event) => {
    setSticky(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const url = 'http://192.168.1.67:3002/api/v1/auth/login/initialize-token';
    const authInfo = {
      'email': email,
      'password': password
    };

    try {
      if (! sticky) {
        const response = await axios.post(url, authInfo);

        /* istanbul ignore else */
        if (response.status === 200) {
          setEmail('');
          setPassword('');
          setServerResponse(response.data.message);
          props.setToken(response.data.token);
          console.log(response.data);
        }
      } else {
        setServerResponse('Unable to authenticate');
      }
    } catch (error) {
      /* istanbul ignore else */
      if (error.response.status === 500) {
        setServerResponse(error.response.data.error);
      }
    }
  };

  return (
    <div className="AppLogin p-3">
      <h2>
        Login
      </h2>
      {serverResponse && <p>{serverResponse}</p>}
      <Form
        className="p-3"
        role="form"
        onSubmit={submitForm}
      >
        <Form.Group className="p-3 mb-3" controlId="loginFormEmail">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="enter email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="loginFormPassword">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>

        <Form.Group hidden className="p-3 mb-3" controlId="loginFormSticky">
          <Form.Label hidden>
            Sticky
          </Form.Label>
          <Form.Control
            hidden
            placeholder="enter a value if you are a spammer"
            value={sticky}
            onChange={handleSticky}
          />
        </Form.Group>

        <Button
          id="loginFormSubmit"
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
