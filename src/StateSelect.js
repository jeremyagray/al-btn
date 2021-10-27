/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import FormSelect from './FormSelect';
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
        <FormSelect
          id="StateSelect"
          classNames={['text-center']}
          label="Select State/Territory"
          value={props.currentState}
          items={states.features.map((state) => {
            return {
              'value': state.properties.usps,
              'key': state.properties.geoid,
              'label': state.properties.name
            };
          })}
          onChange={props.updateCurrentState}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment />
  );
}

export default StateSelect;
