/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  useState
} from 'react';

import './Selector.css';

function Selector() {
  const [graph, setGraph] = useState('counties');

  if (graph === 'counties') {
    return (
      <div className="root">
        <SelectorDropDown
          graph={graph}
          setGraph={setGraph}
        />
      </div>
    );
  }
}

function SelectorDropDown(props) {
  function changer(e) {
    props.setGraph(e.target.value);
  }
  
  return (
    <div id='SelectorDropDown'>
      <label htmlFor="graph-select">Select a Graph:</label>
      <br />
      <select
        name="graphs"
        id="graph-select"
        value={props.graph}
        onChange={changer}
      >
        <option value="counties">county data</option>
        <option value="warnings">current NWS alerts</option>
      </select>
    </div>
  );
}

export default Selector;
