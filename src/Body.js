/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import './Body.css';
import Visualization from './Visualization.js';
import Controls from './Controls.js';

function Body() {
  return (
    <div className="AppBody container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <Visualization />
        <Controls />
      </div>
    </div>
  );
}

export default Body;
