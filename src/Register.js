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

import './Register.css';

export const Register = () => {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordToo, setPasswordToo ] = useState('');
  const [ serverResponse, setServerResponse ] = useState('');

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordToo = (event) => {
    setPasswordToo(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const url = 'http://192.168.1.67:3002/api/v1/users/new';
    const userInfo = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password,
      'passwordToo': passwordToo
    };

    try {
      const response = await axios.post(url, userInfo);

      /* istanbul ignore else */
      if (response.status === 200) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordToo('');
        setServerResponse(response.data.message);
      }
    } catch (error) {
      /* istanbul ignore else */
      if (error.response.status === 500) {
        setServerResponse(error.response.data.error);
      }
    }
  };

  return (
    <div className="AppRegister p-3">
      <h2>
        Register
      </h2>
      {serverResponse && <p>{serverResponse}</p>}
      <p className="text-muted">
        All information entered here will not be sold or used for purposes other than the use of this site.  Thanks!
      </p>
      <Form
        className="p-3"
        role="form"
        onSubmit={submitForm}
      >
        <Form.Group className="p-3 mb-3" controlId="registerFormFirstName">
          <Form.Label>
            First Name
          </Form.Label>
          <Form.Control
            required
            placeholder="enter your first name"
            value={firstName}
            onChange={handleFirstName}
          />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="registerFormLastName">
          <Form.Label>
            Last Name
          </Form.Label>
          <Form.Control
            required
            placeholder="enter your last name"
            value={lastName}
            onChange={handleLastName}
          />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="registerFormEmail">
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

        <Form.Group className="p-3 mb-3" controlId="registerFormPassword">
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

        <Form.Group className="p-3 mb-3" controlId="registerFormPassword">
          <Form.Label>
            Re-enter Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="enter your password again"
            value={passwordToo}
            onChange={handlePasswordToo}
          />
        </Form.Group>

        <Button
          id="registerFormSubmit"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
