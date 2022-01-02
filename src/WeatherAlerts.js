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

  const showAlertTooltipClosure = (areaText, alertText, start, end) => {
    return (event) => {
      const tt = document.createElement('div');
      tt.id = 'alertTooltip';
      tt.style.cssText = `position:absolute;width:250px;visibility:visible;opacity:0.75;color:#ffffff;left:${event.pageX + 20}px;top:${event.pageY + 20}px;`;

      const ul = document.createElement('ul');
      tt.appendChild(ul);

      const alert = document.createElement('li');
      const alertTextNode = document.createTextNode(alertText);
      alert.appendChild(alertTextNode);
      ul.appendChild(alert);

      const area = document.createElement('li');
      area.textContent = areaText;
      ul.appendChild(area);

      const onset = document.createElement('li');
      onset.textContent = start;
      ul.appendChild(onset);

      const expires = document.createElement('li');
      expires.textContent = end;
      ul.appendChild(expires);

      document.body.appendChild(tt);
    }
  }

  const hideAlertTooltipClosure = () => {
    return (event) => {
      const tt = document.getElementById('alertTooltip');
      tt.parentNode.removeChild(tt);
    }
  }

  if (props.showWeatherAlerts && wxData.features) {
    // Filter, keeping advisories.
    const advisories = wxData.features.filter((feature) => {
      if (feature.geometry == null) {
        return false;
      }
      return true;
    });

    return (
      <React.Fragment
        key="weather-alerts-fragment"
      >
        <g
          pointerEvents="none"
          className="wxAlerts"
        >
          {wxData.features.map((alert) => {
            return (
              <path
                pointerEvents="all"
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
                onMouseOver={showAlertTooltipClosure(alert.properties.areaDesc, alert.properties.event, alert.properties.onset, alert.properties.expires)}
                onMouseOut={hideAlertTooltipClosure()}
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
