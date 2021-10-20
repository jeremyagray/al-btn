/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import './GeographyConfig.css';

const GeographyConfig = (props) => {
    return (
      <React.Fragment
      >
        <Form.Check
          type="checkbox"
          checked={props.clipToState}
          onChange={props.toggleClipToState}
          label="clip to state"
          id="clipToState"
        />
        <Form.Check
          type="checkbox"
          checked={props.showSurroundingStates}
          onChange={props.toggleShowSurroundingStates}
          label="show surrounding states"
          id="showSurroundingStates"
        />
        <Form.Check
          type="checkbox"
          checked={props.showCounties}
          onChange={props.toggleShowCounties}
          label="show counties"
          id="showCounties"
        />
      </React.Fragment>
    );
}

export default GeographyConfig;
