/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import RadarLegend from './RadarLegend';
import RadarStationSelect from './RadarStationSelect';

import './RadarConfig.css';

const RadarConfig = (props) => {
  if (props.showRadar) {
    return (
      <React.Fragment
      >
        <RadarStationSelect
          currentState={props.currentState}
          showSurroundingStates={props.showSurroundingStates}
          showRadar={props.showRadar}
          updateRadarStation={props.updateRadarStation}
          radarStation={props.radarStation}
        />
        <Form.Check
          type="checkbox"
          checked={props.showRadarStations}
          onChange={props.toggleShowRadarStations}
          label="show radar stations"
          id="showRadarStations"
        />
        <Form.Group>
          <Form.Label
            htmlFor="radarOpacity"
          >
            Radar Opacity
          </Form.Label>
          <input
            type="range"
            className="form-range"
            id="radarOpacity"
            min="0.00"
            max="1.00"
            step="0.01"
            value={props.radarOpacity}
            onChange={props.updateRadarOpacity}
          />
        </Form.Group>
        <RadarLegend
          showRadar={props.showRadar}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment />
  );
}

export default RadarConfig;
