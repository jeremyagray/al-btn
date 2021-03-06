/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import './AlertOpacity.css';

const AlertOpacity = (props) => {
  return (
    <React.Fragment
    >
      <Form.Group>
        <Form.Label
          htmlFor="alertOpacity"
        >
          Alert Opacity
        </Form.Label>
        <input
          type="range"
          className="form-range"
          id="alertOpacity"
          min="0.00"
          max="1.00"
          step="0.01"
          value={props.alertOpacity}
          onChange={props.updateAlertOpacity}
        />
      </Form.Group>
    </React.Fragment>
  );
}

export default AlertOpacity;
