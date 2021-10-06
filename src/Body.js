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

  return (
    <div className="AppBody container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <Visualization
          visualization={visualization}
          projection={projection}
        />
        <Controls
          visualization={visualization}
          setVisualization={setVisualization}
          projection={projection}
          setProjection={setProjection}
        />
      </div>
    </div>
  );
}

export default Body;
