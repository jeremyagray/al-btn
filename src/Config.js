/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Config.css';

const Config = (props) => {
  function changer(e) {
    console.log(e.target.value);
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
        >
          <option value="nation50">Albers 50 States</option>
          <option value="nation48">Albers Lower 48</option>
          <option value="nationAll">States and Territories (Albers Combined)</option>
          <option value="nationSingle">States and Territories (Single Scale)</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className="AppConfig">
      </div>
    );
  }
}

export default Config;
