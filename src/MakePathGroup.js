/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import useFetchData from './useFetchData';

const colorsUrl = 'http://192.168.1.67:3002/api/v1/weather/nws/alert/colors/all';

export const MakePathGroup = (props) => {
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

  if (props.clipToState) {
    return (
      <g>
        {props.features.map((feat) => {
          return (
            <path
              className={props.pathClassName}
              key={props.getId(feat)}
              stroke={props.strokeColor}
              strokeLinejoin={props.strokeLinejoin}
              d={props.pathFunction(feat)}
              transform={`translate(${props.marginLeft}, ${props.marginTop})`}
              style={{
                'fill': getFillColor(feat),
                'opacity': props.alertOpacity
              }}
              clipPath={`url(#${props.clipPath})`}
            >
            </path>
          );
        })}
      </g>
    );
  }

  return (
    <g>
      {props.features.map((feat) => {
        return (
          <path
            className={props.pathClassName}
            key={props.getId(feat)}
            stroke={props.strokeColor}
            strokeLinejoin={props.strokeLinejoin}
            d={props.pathFunction(feat)}
            transform={`translate(${props.marginLeft}, ${props.marginTop})`}
            style={{
              'fill': getFillColor(feat),
              'opacity': props.alertOpacity
            }}
          >
          </path>
        );
      })}
    </g>
  );
}

export default MakePathGroup;
