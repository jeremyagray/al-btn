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
      <Config
        visualization={props.visualization}
        projection={props.projection}
        setProjection={props.setProjection}
        clipToState={props.clipToState}
        toggleClipToState={props.toggleClipToState}
        showCounties={props.showCounties}
        toggleShowCounties={props.toggleShowCounties}
        showWeatherAlerts={props.showWeatherAlerts}
        toggleShowWeatherAlerts={props.toggleShowWeatherAlerts}
        showStates={props.showStates}
        toggleShowStates={props.toggleShowStates}
        showRadar={props.showRadar}
        toggleShowRadar={props.toggleShowRadar}
        radarOpacity={props.radarOpacity}
        updateRadarOpacity={props.updateRadarOpacity}
        alertOpacity={props.alertOpacity}
        updateAlertOpacity={props.updateAlertOpacity}
      />
    </div>
  );
}

export default Controls;
