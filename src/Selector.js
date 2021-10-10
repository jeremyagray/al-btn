/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import './Selector.css';

function Selector(props) {
  return (
    <div
      id="Selector"
    >
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
      <Form.Group>
        <Form.Label
          htmlFor="SelectorSelectVisualization"
        >
          Select Visualization
        </Form.Label>
        <Form.Control
          as="select"
          id="SelectorSelectVisualization"
          onChange={changer}
          value={props.projection}
        >
          <option value="national">national maps</option>
          <option value="states">state maps</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default Selector;
