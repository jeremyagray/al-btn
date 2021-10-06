/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Controls.css';
import Selector from './Selector.js';
import Config from './Config.js';

function Controls(props) {
  return (
    <div className="AppControls col-md-4 m-0 p-0">
      <Selector
        visualization={props.visualization}
        setVisualization={props.setVisualization}
      />
      <Config />
    </div>
  );
}

export default Controls;
