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
        <Form.Group>
          <Form.Label
            htmlFor="SelectRadarStation"
          >
            Available Radar Stations
          </Form.Label>
          <Form.Control
            as="select"
            id="SelectRadarStation"
            onChange={props.updateRadarStation}
            value={props.radarStation}
          >
            {stations.map((station) => {
              return (
                <option value={station.properties.station} key={station.properties.station}>{station.properties.station}</option>
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

export default RadarStationSelect;
