/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Visualization.css';
import Map from './Nation.js';

function Visualization(props) {
  if (props.visualization === 'national') {
    return (
      <div className="AppVisualization col-md-8 m-0 p-0">
        <Map />
      </div>
    );
  } else {
    return (
      <div className="AppVisualization col-md-8 m-0 p-0">
      </div>
    );
  }    
}

export default Visualization;
