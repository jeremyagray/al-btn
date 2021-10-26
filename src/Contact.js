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

import './Contact.css';

function Contact() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ antispam, setAntispam ] = useState(false);
  const [ serverResponse, setServerResponse ] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleAntispam = (event) => {
    if (event.target.value) {
      setAntispam(true);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const url = 'http://192.168.1.67:3002/api/v1/contact/message';
    const messageBody = {
      'contactName': name,
      'contactEmail': email,
      'contactMessage': message,
      'contactSpam': antispam,
    };

    try {
      const response = await axios.post(url, messageBody);

      if (response.status === 200) {
        setName('');
        setEmail('');
        setMessage('');
        setAntispam('');
        setServerResponse(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 500) {
        setServerResponse(error.response.data.error);
      }
    }
  };

  return (
    <div className="AppContact p-3">
      <h2>
        Contact
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
        <Form.Group className="p-3 mb-3" controlId="contactFormName">
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control
            required
            placeholder="enter your name"
            value={name}
            onChange={handleName}
          />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="contactFormEmail">
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

        <Form.Group className="p-3 mb-3" controlId="contactFormMessage">
          <Form.Label>
            Message
          </Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            placeholder="enter your message"
            value={message}
            onChange={handleMessage}
          />
        </Form.Group>

        <Form.Control
          hidden
          placeholder="enter a value if you are a spammer"
          value={antispam}
          onChange={handleAntispam}
        />

        <Button
          id="contactFormSubmit"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
