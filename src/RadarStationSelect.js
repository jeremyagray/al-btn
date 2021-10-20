/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import './RadarStationSelect.css';

const RadarStationSelect = (props) => {
  if (props.showRadar) {
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
            {props.stations.map((station) => {
              return (
                <option value={station.value} key={station.key}>{station.name}</option>
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
