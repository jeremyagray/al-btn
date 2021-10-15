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
        visualizations={props.visualizations}
        updateVisualization={props.updateVisualization}
      />
    </div>
  );
}

function SelectorDropDown(props) {
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
          onChange={props.updateVisualization}
          value={props.visualization}
        >
          {props.visualizations.map((viz) => {
            return (
              <option value={viz.value} key={viz.key}>{viz.title}</option>
            );
          })}
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default Selector;
