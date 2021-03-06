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
import useRefetchData from './hooks/useRefetchData';

const colorsUrl = 'http://192.168.1.67:3002/api/v1/weather/nws/alert/colors/all';

export const WeatherAdvisories = (props) => {
  const countiesUrl = `http://192.168.1.67:3002/api/v1/geography/counties/state/usps/${props.currentState}/all`;

  const [
    countiesData,
    loading,
    error
  ] = useFetchData(countiesUrl, {'features': []});

  let wxDataUrl = '';
  if (props.showWeatherAdvisories) {
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
          // console.log(`event: ${feat.properties.event} color: ${colorsData.colors[i].color}`);
          return colorsData.colors[i].color;
        }
      }
    }
    return '#0000ff';
  }

  const createAdvisoryGeoJSON = (alert) => {
    let features = [];
    for (let i = 0; i < alert.geocode.SAME; i++) {
      for (let j = 0; j < countiesData.features.length; j++) {
        if (countiesData.features[j].GEOID === alert.geocode.SAME[i].substr(1)) {
          features.push(countiesData.features[j]);
          break;
        }
      }
    }

    return {
      "type": "FeatureCollection",
      "features": features
    };
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
      // console.log("hide");

      const tt = document.getElementById('alertTooltip');
      tt.parentNode.removeChild(tt);
    }
  }

  if (props.showWeatherAdvisories
      && wxData.features
      && countiesData.features) {
    // Filter, keeping advisories.
    // console.log(countiesData.features);
    const advisories = wxData.features.filter((feature) => {
      if (feature.geometry == null) {
        return true;
      }
      return false;
    });

    return (
      <React.Fragment
        key="weather-advisories-fragment"
      >
        <g
          pointerEvents="none"
          className="wxAdvisories"
        >
          {advisories.map((alert) => {
            return alert.properties.geocode.SAME.map((same) => {
              let county;

              for (let i = 0; i < countiesData.features.length; i++) {
                // console.log(countiesData.features[i]);
                if (countiesData.features[i].properties.GEOID === same.substr(1)) {
                  county = countiesData.features[i];
                  // console.log(`found county: ${JSON.stringify(county)}`);
                  break;
                }
              }

              if (county) {
                // console.log("county advisory");
                // console.log(props.pathClassName);
                // console.log(`${props.getId(alert)}-${county.properties.GEOID}`);
                // console.log(props.strokeColor);
                // console.log(props.strokeLinejoin);
                // console.log(getFillColor(alert));
                // console.log(props.alertOpacity);
                return (
                  <path
                    pointerEvents="all"
                    className={props.pathClassName}
                    key={`${props.getId(alert)}-${county.properties.GEOID}`}
                    stroke={getFillColor(alert)}
                    strokeLinejoin={props.strokeLinejoin}
                    d={props.pathFunction(county)}
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
              }
            })})}
        </g>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment
      key="weather-advisories-fragment"
    >
    </React.Fragment>
  );
}

export default WeatherAdvisories;
