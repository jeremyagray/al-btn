/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Visualization.css';
import NationMap from './Nation.js';
import StateMap from './State.js';

function Visualization(props) {
  if (props.visualization === 'national') {
    return (
      <div className="AppVisualization col-md-8 m-0 p-0">
        <NationMap
          projection={props.projection}
          showStates={props.showStates}
        />
      </div>
    );
  } else if (props.visualization === 'states') {
    return (
      <div className="AppVisualization col-md-8 m-0 p-0">
        <StateMap
          showCounties={props.showCounties}
          showWeatherAlerts={props.showWeatherAlerts}
          showRadar={props.showRadar}
        />
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
