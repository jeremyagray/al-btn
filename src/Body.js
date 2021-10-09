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
  const [visualization, setVisualization] = useState('national');
  const [projection, setProjection] = useState('nation50');

  // National map state.
  const [showStates, setShowStates] = useState(false);

  const toggleShowStates = () => {
    setShowStates(!showStates);
  }

  // State map state.
  const [showCounties, setShowCounties] = useState(false);

  const toggleShowCounties = () => {
    setShowCounties(!showCounties);
  }

  // Weather state.
  const [showWeatherAlerts, setShowWeatherAlerts] = useState(false);

  const toggleShowWeatherAlerts = () => {
    setShowWeatherAlerts(!showWeatherAlerts);
  }

  return (
    <div className="AppBody container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <Visualization
          visualization={visualization}
          projection={projection}
          showCounties={showCounties}
          showStates={showStates}
          showWeatherAlerts={showWeatherAlerts}
        />
        <Controls
          visualization={visualization}
          setVisualization={setVisualization}
          projection={projection}
          setProjection={setProjection}
          showCounties={showCounties}
          toggleShowCounties={toggleShowCounties}
          showStates={showStates}
          toggleShowStates={toggleShowStates}
          showWeatherAlerts={showWeatherAlerts}
          toggleShowWeatherAlerts={toggleShowWeatherAlerts}
        />
      </div>
    </div>
  );
}

export default Body;
