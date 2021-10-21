/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import AlertConfig from './AlertConfig';
import GeographyConfig from './GeographyConfig';
import RadarConfig from './RadarConfig';

import './Config.css';

const Config = (props) => {
  if (props.visualization === 'national') {
    return (
      <div className="AppConfig">
        <Form.Group>
          <Form.Label
            htmlFor="NationSelectProjection"
          >
            Select Projection
          </Form.Label>
          <Form.Control
            as="select"
            id="NationSelectProjection"
            onChange={props.updateProjection}
            value={props.projection}
          >
            <option value="nation50">Albers 50 States</option>
            <option value="nationAll">States and Territories (Albers Combined)</option>
            <option value="nationSingle">States and Territories (Single Scale)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            checked={props.showStates}
            onChange={props.toggleShowStates}
            label="show states"
            id="NationShowStates"
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            checked={props.showRadarStations}
            onChange={props.toggleShowRadarStations}
            label="show radar stations"
            id="showRadarStations"
          />
        </Form.Group>
      </div>
    );
  } else {
    return (
      <div className="AppConfig">
        <GeographyConfig
          currentState={props.currentState}
          updateCurrentState={props.updateCurrentState}
          clipToState={props.clipToState}
          toggleClipToState={props.toggleClipToState}
          showSurroundingStates={props.showSurroundingStates}
          toggleShowSurroundingStates={props.toggleShowSurroundingStates}
          showCounties={props.showCounties}
          toggleShowCounties={props.toggleShowCounties}
        />
        <Form.Check
          type="checkbox"
          checked={props.showRadar}
          onChange={props.toggleShowRadar}
          label="show radar"
          id="showRadar"
        />
        <RadarConfig
          currentState={props.currentState}
          showSurroundingStates={props.showSurroundingStates}
          showRadar={props.showRadar}
          radarStation={props.radarStation}
          updateRadarStation={props.updateRadarStation}
          showRadarStations={props.showRadarStations}
          toggleShowRadarStations={props.toggleShowRadarStations}
          radarOpacity={props.radarOpacity}
          updateRadarOpacity={props.updateRadarOpacity}
        />
        <Form.Check
          type="checkbox"
          checked={props.showWeatherAlerts}
          onChange={props.toggleShowWeatherAlerts}
          label="show weather alerts"
          id="showWeatherAlerts"
        />
        <AlertConfig
          showWeatherAlerts={props.showWeatherAlerts}
          alertOpacity={props.alertOpacity}
          updateAlertOpacity={props.updateAlertOpacity}
        />
      </div>
    );
  }
}

export default Config;
