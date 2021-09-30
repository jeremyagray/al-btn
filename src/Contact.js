/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Contact.css';

function Contact() {
  return (
    <div className="AppContact">
      <h2>
        Contact
      </h2>
      <p className="text-muted">
        All information entered here will not be sold or used for purposes other than the use of this site.  Thanks!
      </p>
      <Form className="p-3">
        <Form.Group className="p-3 mb-3" controlId="contactFormName">
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control required placeholder="enter your name" />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="contactFormEmail">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control required type="email" placeholder="enter email" />
        </Form.Group>

        <Form.Group className="p-3 mb-3" controlId="contactFormMessage">
          <Form.Label>
            Message
          </Form.Label>
          <Form.Control as="textarea" rows={3} required placeholder="enter your message" />
        </Form.Group>

        <Form.Control hidden placeholder="enter a value if you are a spammer" />

        <Button id="contactFormSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
