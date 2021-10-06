/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  useState
} from 'react';

import './Selector.css';

function Selector(props) {
  return (
    <div className="root">
      <SelectorDropDown
        visualization={props.visualization}
        setVisualization={props.setVisualization}
      />
    </div>
  );
}

function SelectorDropDown(props) {
  function changer(e) {
    props.setVisualization(e.target.value);
  }
  
  return (
    <div id='SelectorDropDown'>
      <label htmlFor="selectVisualization">Select Visualization</label>
      <br />
      <select
        id="selectVisualization"
        value={props.visualization}
        onChange={changer}
      >
        <option value="national">national maps</option>
        <option value="states">state maps</option>
        <option value="warnings">current NWS alerts</option>
      </select>
    </div>
  );
}

export default Selector;
