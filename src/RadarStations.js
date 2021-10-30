/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

import useFetchData from './useFetchData';

import './RadarStations.css';

const RadarStations = (props) => {
  let radarStationsDataUrl = '';

  if (props.showRadarStations) {
    radarStationsDataUrl = 'http://192.168.1.67:3002/api/v1/weather/nws/radars/all';
  }

  const [
    radarStationsData,
    loading,
    error
  ] = useFetchData(radarStationsDataUrl);

  if (props.showRadarStations && radarStationsData && ! loading && ! error) {
    return (
      <React.Fragment
        key="radar-stations-fragment"
      >
        {radarStationsData.map((station) => {
          return (
            <circle
              className="radarStation"
              data-testid={station.properties.station}
              id={station.properties.station}
              key={station.properties.station}
              cx={props.projection(station.geometry.coordinates)[0]}
              cy={props.projection(station.geometry.coordinates)[1]}
              r="5"
              transform={`translate(${props.dms.marginLeft}, ${props.dms.marginTop})`}
            />
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment
      key="radar-stations-fragment"
    >
    </React.Fragment>
  );
}

export default RadarStations;
