/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import './Visualization.css';
import AlabamaMap from './Counties.js';

function Visualization() {
  return (
    <div className="AppVisualization">
      <AlabamaMap />
    </div>
  );
}

export default Visualization;
