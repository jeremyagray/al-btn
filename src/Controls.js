/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Controls.css';

import Config from './Config';
import FormSelect from './FormSelect';

function Controls(props) {
  return (
    <div className="AppControls col-md-4 m-0 p-0">
      <FormSelect
        id="VisualizationSelect"
        classNames={['text-center']}
        label="Select Visualization"
        value={props.visualization}
        items={props.visualizations}
        onChange={props.updateVisualization}
      />
      <Config
        visualization={props.visualization}
        projection={props.projection}
        updateProjection={props.updateProjection}
        currentState={props.currentState}
        updateCurrentState={props.updateCurrentState}
        clipToState={props.clipToState}
        toggleClipToState={props.toggleClipToState}
        showSurroundingStates={props.showSurroundingStates}
        toggleShowSurroundingStates={props.toggleShowSurroundingStates}
        showCounties={props.showCounties}
        toggleShowCounties={props.toggleShowCounties}
        showWeatherAlerts={props.showWeatherAlerts}
        toggleShowWeatherAlerts={props.toggleShowWeatherAlerts}
        showStates={props.showStates}
        toggleShowStates={props.toggleShowStates}
        showRadar={props.showRadar}
        toggleShowRadar={props.toggleShowRadar}
        radarStation={props.radarStation}
        updateRadarStation={props.updateRadarStation}
        showRadarStations={props.showRadarStations}
        toggleShowRadarStations={props.toggleShowRadarStations}
        radarOpacity={props.radarOpacity}
        updateRadarOpacity={props.updateRadarOpacity}
        alertOpacity={props.alertOpacity}
        updateAlertOpacity={props.updateAlertOpacity}
      />
    </div>
  );
}

export default Controls;
