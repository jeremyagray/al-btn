/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

import useFetchData from './useFetchData';
import useRefetchData from './useRefetchData';

const colorsUrl = 'http://192.168.1.67:3002/api/v1/weather/nws/alert/colors/all';

export const WeatherAlerts = (props) => {
  let wxDataUrl = '';
  if (props.showWeatherAlerts) {
    wxDataUrl = 'https://api.weather.gov/alerts/active/area/AL';
  }

  const [
    wxData
  ] = useRefetchData(wxDataUrl, 300000, {'features': []});

  const [
    colorsData,
  ] = useFetchData(colorsUrl);

  const getFillColor = (feat) => {
    if (colorsData) {
      for (let i = 0; i < colorsData.colors.length; i++) {
        if (feat.properties.event.toLowerCase()
            === colorsData.colors[i].event.toLowerCase()) {
          return colorsData.colors[i].color;
        }
      }
    }
    return '#0000ff';
  }

  if (props.showWeatherAlerts && wxData.features) {
    if (props.clipToState) {
      return (
        <React.Fragment
          key="weather-alerts-fragment"
        >
          <g>
            {wxData.features.map((alert) => {
              return (
                <path
                  className={props.pathClassName}
                  key={props.getId(alert)}
                  stroke={props.strokeColor}
                  strokeLinejoin={props.strokeLinejoin}
                  d={props.pathFunction(alert)}
                  transform={`translate(${props.marginLeft}, ${props.marginTop})`}
                  style={{
                    'fill': getFillColor(alert),
                    'opacity': props.alertOpacity
                  }}
                  clipPath={`url(#${props.clipPath})`}
                >
                </path>
              );
            })}
          </g>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment
        key="weather-alerts-fragment"
      >
        <g>
          {wxData.features.map((alert) => {
            return (
              <path
                className={props.pathClassName}
                key={props.getId(alert)}
                stroke={props.strokeColor}
                strokeLinejoin={props.strokeLinejoin}
                d={props.pathFunction(alert)}
                transform={`translate(${props.marginLeft}, ${props.marginTop})`}
                style={{
                  'fill': getFillColor(alert),
                  'opacity': props.alertOpacity
                }}
              >
              </path>
            );
          })}
        </g>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment
      key="weather-alerts-fragment"
    >
    </React.Fragment>
  );
}

export default WeatherAlerts;
