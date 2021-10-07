/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Config.css';

const Config = (props) => {
  function changer(e) {
    props.setProjection(e.target.value);
  }

  if (props.visualization === 'national') {
    return (
      <div className="AppConfig">
        <label htmlFor="nationSelectProj">Select Projection</label>
        <br />
        <select
          id="nationSelectProj"
          onChange={changer}
          value={props.projection}
        >
          <option value="nation50">Albers 50 States</option>
          <option value="nationAll">States and Territories (Albers Combined)</option>
          <option value="nationSingle">States and Territories (Single Scale)</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={props.showStates}
            onChange={props.toggleShowStates}
          />
          states
        </label>
      </div>
    );
  } else {
    return (
      <div className="AppConfig">
        <label>
          <input
            type="checkbox"
            checked={props.showCounties}
            onChange={props.toggleShowCounties}
          />
          counties
        </label>
      </div>
    );
  }
}

export default Config;
