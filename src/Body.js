/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import './Body.css';
import Visualization from './Visualization.js';
import Controls from './Controls.js';

function Body() {
  return (
    <div className="AppBody">
      <Visualization />
      <Controls />
    </div>
  );
}

export default Body;
