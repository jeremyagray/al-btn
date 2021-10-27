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

import './RadarStationSelect.css';

const RadarStationSelect = (props) => {
  let url = '';
  if (props.showSurroundingStates) {
    url = 'http://192.168.1.67:3002/api/v1/weather/nws/radars/all';
  } else {
    url = `http://192.168.1.67:3002/api/v1/weather/nws/radars/state/${props.currentState}`;
  }

  const [
    stations,
    loading,
    error
  ] = useFetchData(url);

  if (props.showRadar && ! loading && ! error) {
    return (
      <React.Fragment
      >
        <FormSelect
          id="StateSelect"
          classNames={['text-center']}
          label="Available Radar Stations"
          value={props.radarStation}
          default={{
            'value': '',
            'key': 'default',
            'label': ''
          }}
          items={stations.map((station) => {
            return {
              'value': station.properties.station,
              'key': station.properties.station,
              'label': station.properties.station
            };
          })}
          onChange={props.updateRadarStation}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment />
  );
}

export default RadarStationSelect;
