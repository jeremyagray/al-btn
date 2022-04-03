/**
 *
 * dark-blue-yonder, custom view of NWS radar, alert, and weather data
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 */

// React.
import React from 'react';

import useFetchData from './hooks/useFetchData';

import './RadarLegend.css';

const RadarLegend = (props) => {
  let legendDataUrl = '';

  if (props.showRadar) {
    legendDataUrl = 'https://opengeo.ncep.noaa.gov/geoserver/styles/reflectivity.png';
  }

  // Fetch and set the legend data.
  const [
    legendData
  ] = useFetchData(legendDataUrl, null, {'responseType': 'blob'});

  if (props.showRadar) {
    if (legendData) {
      return (
        <div
          id="radarLegend"
        >
          <p>
            Radar Legend
          </p>
          <img
            id="radarLegendImage"
            alt="radar legend"
            src={URL.createObjectURL(legendData)}
          />
        </div>
      );
    }
  }

  return (
    <React.Fragment />
  );
}

export default RadarLegend;
