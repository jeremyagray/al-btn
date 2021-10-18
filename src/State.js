/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// D3.
import * as d3 from 'd3';

// Local components.
import useChartDimensions from './useChartDimensions';
import useFetchData from './useFetchData';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';
import WeatherAlerts from './WeatherAlerts';
import Radar from './Radar';
import RadarStations from './RadarStations';
import Counties from './Counties';
import States from './States';

export const StateMap = (props) => {
  // Alabama's geographic center: [ 32*50'5'', 86*38'50'']
  // Get centroid from API.
  const geoCenter = {
    'latitude': 32 + (50/60) + (5/3600),
    'longitude': -(86 + (38/60) + (50/3600))
  };

  const [ref, dms] = useChartDimensions({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  });

  const [
    stateData,
    stateLoadingData,
    stateLoadingDataError
  ] = useFetchData('http://192.168.1.67:3002/api/v1/geography/states/usps/al');

  const statuses = [
    stateLoadingData
  ];
  const errors = [
    stateLoadingDataError
  ];

  if (statuses.some(Boolean)) {
    return (
      <div
        className="visualization d-flex"
        ref={ref}
      >
        <LoadingSpinner />
      </div>
    );
  } else if (errors.some(Boolean)) {
    return (
      <div
        className="visualization"
        ref={ref}
      >
        <LoadingError
          errors={errors}
        />
      </div>
    );
  } else {
    // Spherical Mercator projection, like NWS radar and rest of web.
    const projection = d3.geoMercator()
          .center([0, geoCenter.latitude])
          .rotate([-geoCenter.longitude, 0])
          .fitSize([dms.boundedWidth, dms.boundedHeight], stateData.features[0]);

    // Path generator.
    const path = d3.geoPath().projection(projection);

    return (
      <div
        className="visualization"
        ref={ref}
      >
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
            currentState="AL"
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
            dms={dms}
            pathFunction={path}
            stroke="#000000"
            strokeLinejoin="round"
            colorFunction={() => {
              return '#b20021';
            }}
          />
          <RadarStations
            showRadarStations={props.showRadarStations}
            projection={projection}
            dms={dms}
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
            showWeatherAlters={props.showWeatherAlerts}
          />
          <Radar
            dms={dms}
            projection={projection}
            opacity={props.radarOpacity}
            showRadar={props.showRadar}
            clipToState={props.clipToState}
            clipPath="stateImageClipPath"
          />
        </svg>
      </div>
    );
  }
}

export default StateMap;
