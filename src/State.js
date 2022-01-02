/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  forwardRef
} from 'react';
import React from 'react';

// D3.
import * as d3 from 'd3';

// Local hooks and components.
import { useChartDimensionsWithRef } from './useChartDimensions';
import useFetchData from './useFetchData';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';
import WeatherAlerts from './WeatherAlerts';
import WeatherAdvisories from './WeatherAdvisories';
import Radar from './Radar';
import RadarStations from './RadarStations';
import Counties from './Counties';
import States from './States';

export const StateMap = forwardRef((props, ref) => {
  const [dms] = useChartDimensionsWithRef({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  }, ref);

  const [
    stateData,
    stateLoadingData,
    stateLoadingDataError
  ] = useFetchData(`http://192.168.1.67:3002/api/v1/geography/states/usps/${props.currentState.toLowerCase()}`);

  const statuses = [
    stateLoadingData
  ];
  const errors = [
    stateLoadingDataError
  ];

  if (statuses.some(Boolean)) {
    return (
      <div
        className="loadingStatuses d-flex"
      >
        <LoadingSpinner />
      </div>
    );
  } else if (errors.some(Boolean)) {
    return (
      <div
        className="loadingErrors"
      >
        <LoadingError
          errors={errors}
        />
      </div>
    );
  } else {
    // Spherical Mercator projection, like NWS radar and rest of web.
    const projection = d3.geoMercator()
          .center([0, stateData.features[0].properties.centroid.coordinates[1]])
          .rotate([-stateData.features[0].properties.centroid.coordinates[0], 0])
          .fitSize([dms.boundedWidth, dms.boundedHeight], stateData.features[0]);

    // Path generator.
    const path = d3.geoPath().projection(projection);

    return (
      <React.Fragment>
        <svg
          id="mapSVG"
          height={dms.height}
          width={dms.width}
          style={{
            'backgroundColor': '#ffffff'
          }}
        >
          <defs>
            <clipPath
              id="stateImageClipPath"
              key="stateImageClipPath"
            >
              {stateData.features.map((feat) => {
                return (
                  <path
                    key={feat.properties.geoid}
                    d={path(feat)}
                    transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}
                  >
                  </path>
                );
              })}
            </clipPath>
            <clipPath
              id="statePathClipPath"
              key="statePathClipPath"
            >
              {stateData.features.map((feat) => {
                return (
                  <path
                    key={feat.properties.geoid}
                    d={path(feat)}
                  >
                  </path>
                );
              })}
            </clipPath>
          </defs>
          <States
            currentState={props.currentState}
            showSurroundingStates={props.showSurroundingStates}
            dms={dms}
            projection={projection}
            pathFunction={path}
            stroke="#000000"
            strokeLinejoin="round"
            colorFunction={() => {
              return '#b20021';
            }}
          />
          <Counties
            showCounties={props.showCounties}
            currentState={props.currentState}
            dms={dms}
            pathFunction={path}
            stroke="#000000"
            strokeLinejoin="round"
            colorFunction={() => {
              return '#b20021';
            }}
          />
          <WeatherAdvisories
            currentState={props.currentState}
            pathClassName="wxAdvisory"
            strokeColor="#0000ff"
            strokeLinejoin="round"
            pathFunction={path}
            getId={(feat) => {
              return feat.properties.id;
            }}
            marginLeft={dms.marginLeft}
            marginTop={dms.marginTop}
            alertOpacity={props.alertOpacity}
            clipToState={props.clipToState}
            clipPath="statePathClipPath"
            showWeatherAdvisories={props.showWeatherAlerts}
          />
          <WeatherAlerts
            pathClassName="wxAlert"
            strokeColor="#0000ff"
            strokeLinejoin="round"
            pathFunction={path}
            getId={(feat) => {
              return feat.properties.id;
            }}
            marginLeft={dms.marginLeft}
            marginTop={dms.marginTop}
            alertOpacity={props.alertOpacity}
            clipToState={props.clipToState}
            clipPath="statePathClipPath"
            showWeatherAlerts={props.showWeatherAlerts}
          />
          <RadarStations
            showRadarStations={props.showRadarStations}
            updateRadarStation={props.updateRadarStation}
            projection={projection}
            dms={dms}
          />
          <Radar
            dms={dms}
            projection={projection}
            opacity={props.radarOpacity}
            showRadar={props.showRadar}
            radarStation={props.radarStation}
            clipToState={props.clipToState}
            clipPath="stateImageClipPath"
          />
        </svg>
      </React.Fragment>
    );
  }
});

export default StateMap;
