/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import RadarLegend from './RadarLegend';

import './Config.css';

const Config = (props) => {
  function changer(e) {
    props.setProjection(e.target.value);
  }

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
            onChange={changer}
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
        <Form.Check
          type="checkbox"
          checked={props.showRadar}
          onChange={props.toggleShowRadar}
          label="show radar"
          id="showRadar"
        />
      <Form.Group>
        <Form.Label
          htmlFor="SelectRadarStation"
        >
          Select Radar Station
        </Form.Label>
        <Form.Control
          as="select"
          id="SelectRadarStation"
          onChange={props.updateRadarStation}
          value={props.radarStation}
        >
          {props.visibleRadarStations.map((station) => {
            return (
              <option value={station.value} key={station.key}>{station.name}</option>
            );
          })}
        </Form.Control>
      </Form.Group>
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
        <Form.Check
          type="checkbox"
          checked={props.showWeatherAlerts}
          onChange={props.toggleShowWeatherAlerts}
          label="show weather alerts"
          id="showWeatherAlerts"
        />
        <Form.Group>
          <Form.Label
            htmlFor="alertOpacity"
          >
            Alert Opacity
          </Form.Label>
          <input
            type="range"
            className="form-range"
            id="alertOpacity"
            min="0.00"
            max="1.00"
            step="0.01"
            value={props.alertOpacity}
            onChange={props.updateAlertOpacity}
          />
        </Form.Group>
      </div>
    );
  }
}

export default Config;
