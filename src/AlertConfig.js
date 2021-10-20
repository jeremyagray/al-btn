/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

import AlertOpacity from './AlertOpacity';

import './AlertConfig.css';

const AlertConfig = (props) => {
  if (props.showWeatherAlerts) {
    return (
      <React.Fragment
      >
        <AlertOpacity
          alertOpacity={props.alertOpacity}
          updateAlertOpacity={props.updateAlertOpacity}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment />
  );
}

export default AlertConfig;
