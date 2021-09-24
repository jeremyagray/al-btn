/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// import {
//   useState
// } from 'react';

import './Controls.css';
import Selector from './Selector.js';

function Controls() {
  return (
    <div className="AppControls">
      <Selector />
    </div>
  );
}

export default Controls;
