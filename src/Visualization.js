/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Visualization.css';
import AlabamaMap from './Counties.js';

function Visualization() {
  return (
    <div className="AppVisualization col-md-8 m-0 p-0">
      <AlabamaMap />
    </div>
  );
}

export default Visualization;
