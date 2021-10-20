/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import useFetchData from './useFetchData';

import './StateSelect.css';

const StateSelect = (props) => {
  const statesUrl = 'http://192.168.1.67:3002/api/v1/geography/states/all';
  const [
    states
  ] = useFetchData(statesUrl);

  if (states && states.features) {
    return (
      <React.Fragment
      >
        <Form.Group>
          <Form.Label
            htmlFor="SelectState"
          >
            Select State/Territory
          </Form.Label>
          <Form.Control
            as="select"
            id="SelectState"
            onChange={props.updateCurrentState}
            value={props.currentState}
          >
            {states.features.map((state) => {
              return (
                <option
                  value={state.properties.usps}
                  key={state.properties.geoid}
                >
                  {state.properties.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment />
  );
}

export default StateSelect;
