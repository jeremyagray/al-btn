/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';

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
      </div>
    );
  } else {
    return (
      <div className="AppConfig">
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
        <Form.Check
          type="checkbox"
          checked={props.showWeatherAlerts}
          onChange={props.toggleShowWeatherAlerts}
          label="show weather alerts"
          id="showWeatherAlerts"
        />
      </div>
    );
  }
}

export default Config;
