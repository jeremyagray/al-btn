/**
 *
 * dark-blue-yonder, custom view of NWS radar, alert, and weather data
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 */

// React.
import React from 'react';

import FormSelect from './FormSelect';
import useFetchData from './hooks/useFetchData';

import './StateSelect.css';

const StateSelect = (props) => {
  const statesUrl = 'http://192.168.1.67:3002/api/v1/geography/states/all';
  const [
    states,
    loading,
    error
  ] = useFetchData(statesUrl);

  if (! loading && ! error) {
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
