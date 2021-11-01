/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import StateSelect from './StateSelect';

import './GeographyConfig.css';

// <Form.Check
//   type="checkbox"
//   checked={props.clipToState}
//   onChange={props.toggleClipToState}
//   label="clip to state"
//   id="clipToState"
// />
// <Form.Check
//   type="checkbox"
//   checked={props.showSurroundingStates}
//   onChange={props.toggleShowSurroundingStates}
//   label="show surrounding states"
//   id="showSurroundingStates"
// />

const GeographyConfig = (props) => {
    return (
      <React.Fragment
      >
        <StateSelect
          currentState={props.currentState}
          updateCurrentState={props.updateCurrentState}
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
