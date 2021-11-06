/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Logout.css';

export const Logout = (props) => {

  const submitForm = async (event) => {
    event.preventDefault();

    props.setToken(null);
  };

  return (
    <div className="AppLogout p-3">
      <h2>
        Logout
      </h2>
      <Form
        className="p-3"
        role="form"
        onSubmit={submitForm}
      >
        <Button
          id="logoutFormSubmit"
          variant="primary"
          type="submit"
        >
          Logout
        </Button>
      </Form>
    </div>
  );
};

export default Logout;
