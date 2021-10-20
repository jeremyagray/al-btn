/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  useState
} from 'react';

import './Body.css';
import Visualization from './Visualization.js';
import Controls from './Controls.js';

function Body() {
  // Visualization selection.
  const [visualization, setVisualization] = useState('national');
  const visualizations = [
    {
      'value': 'national',
      'key': 'national',
      'title': 'national map',
    },
    {
      'value': 'weather',
      'key': 'weather',
      'title': 'weather',
    }
  ];

  const updateVisualization = (event) => {
    setVisualization(event.target.value);
  }

  const [projection, setProjection] = useState('nation50');

  // National map state.
  const [showStates, setShowStates] = useState(false);

  const toggleShowStates = () => {
    setShowStates(!showStates);
  }

  // Selected state state.
  const [currentState, setCurrentState] = useState('');

  const updateCurrentState = (event) => {
    setCurrentState(event.target.value);
  }

  // State map state.
  const [showSurroundingStates, setShowSurroundingStates] = useState(false);

  const toggleShowSurroundingStates = () => {
    setShowSurroundingStates(!showSurroundingStates);
  }

  const [showCounties, setShowCounties] = useState(false);

  const toggleShowCounties = () => {
    setShowCounties(!showCounties);
  }

  // Weather state.
  const [showWeatherAlerts, setShowWeatherAlerts] = useState(false);

  const toggleShowWeatherAlerts = () => {
    setShowWeatherAlerts(!showWeatherAlerts);
  }

  // Alert opacity state.
  const [alertOpacity, setAlertOpacity] = useState(0.50);

  const updateAlertOpacity = (event) => {
    setAlertOpacity(event.target.value);
  }

  // Radar state.
  const [showRadar, setShowRadar] = useState(false);

  const toggleShowRadar = () => {
    setShowRadar(!showRadar);
  }

  // Radar opacity state.
  const [radarOpacity, setRadarOpacity] = useState(0.50);

  const updateRadarOpacity = (event) => {
    setRadarOpacity(event.target.value);
  }

  // Radar station state.
  const [radarStation, setRadarStation] = useState('');

  const updateRadarStation = (event) => {
    setRadarStation(event.target.value);
  }

  // Radar stations state.
  const [radarStations, setRadarStations] = useState([
    {
      'value': 'kbmx',
      'key': 'kbmx',
      'name': 'KBMX'
    },
    {
      'value': 'kgwx',
      'key': 'kgwx',
      'name': 'KGWX'
    },
    {
      'value': 'keox',
      'key': 'keox',
      'name': 'KEOX'
    },
    {
      'value': 'khtx',
      'key': 'khtx',
      'name': 'KHTX'
    },
    {
      'value': 'kmxx',
      'key': 'kmxx',
      'name': 'KMXX'
    },
    {
      'value': 'kmob',
      'key': 'kmob',
      'name': 'KMOB'
    }
  ]);

  const updateRadarStations = (stations) => {
    setRadarStations(stations);
  }

  // Radar station state.
  const [showRadarStations, setShowRadarStations] = useState(false);

  const toggleShowRadarStations = () => {
    setShowRadarStations(!showRadarStations);
  }

  // Clip to state boundard state.
  const [clipToState, setClipToState] = useState(false);

  const toggleClipToState = () => {
    setClipToState(!clipToState);
  }

  return (
    <div className="AppBody container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <Visualization
          visualization={visualization}
          projection={projection}
          clipToState={clipToState}
          showSurroundingStates={showSurroundingStates}
          showCounties={showCounties}
          showStates={showStates}
          showWeatherAlerts={showWeatherAlerts}
          showRadar={showRadar}
          showRadarStations={showRadarStations}
          radarOpacity={radarOpacity}
          alertOpacity={alertOpacity}
        />
        <Controls
          visualization={visualization}
          visualizations={visualizations}
          updateVisualization={updateVisualization}
          projection={projection}
          setProjection={setProjection}
          currentState={currentState}
          updateCurrentState={updateCurrentState}
          clipToState={clipToState}
          toggleClipToState={toggleClipToState}
          showSurroundingStates={showSurroundingStates}
          toggleShowSurroundingStates={toggleShowSurroundingStates}
          showCounties={showCounties}
          toggleShowCounties={toggleShowCounties}
          showStates={showStates}
          toggleShowStates={toggleShowStates}
          showWeatherAlerts={showWeatherAlerts}
          toggleShowWeatherAlerts={toggleShowWeatherAlerts}
          showRadar={showRadar}
          toggleShowRadar={toggleShowRadar}
          radarStation={radarStation}
          updateRadarStation={updateRadarStation}
          radarStations={radarStations}
          showRadarStations={showRadarStations}
          toggleShowRadarStations={toggleShowRadarStations}
          radarOpacity={radarOpacity}
          updateRadarOpacity={updateRadarOpacity}
          alertOpacity={alertOpacity}
          updateAlertOpacity={updateAlertOpacity}
        />
      </div>
    </div>
  );
}

export default Body;
