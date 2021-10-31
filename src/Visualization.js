/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  forwardRef
} from 'react';

import NationMap from './Nation.js';
import StateMap from './State.js';

import './Visualization.css';

export const Visualization = forwardRef((props, ref) => {
  if (props.visualization === 'national') {
    return (
      <div
        className="AppVisualization col-md-8 m-0 p-0"
        ref={ref}
      >
        <NationMap
          ref={ref}
          projection={props.projection}
          showStates={props.showStates}
          showRadarStations={props.showRadarStations}
        />
      </div>
    );
  } else if (props.visualization === 'weather') {
    return (
      <div
        className="AppVisualization col-md-8 m-0 p-0"
        ref={ref}
      >
        <StateMap
          ref={ref}
          currentState={props.currentState}
          clipToState={props.clipToState}
          showSurroundingStates={props.showSurroundingStates}
          showCounties={props.showCounties}
          showWeatherAlerts={props.showWeatherAlerts}
          showRadar={props.showRadar}
          showRadarStations={props.showRadarStations}
          radarStation={props.radarStation}
          updateRadarStation={props.updateRadarStation}
          radarOpacity={props.radarOpacity}
          alertOpacity={props.alertOpacity}
        />
      </div>
    );
  } else {
    return (
      <div
        className="AppVisualization col-md-8 m-0 p-0"
        ref={ref}
      >
      </div>
    );
  }    
});

export default Visualization;
