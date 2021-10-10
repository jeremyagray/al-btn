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
import MakePathGroup from './MakePathGroup';
import Radar from './Radar';

// import radar from './img.png';

export const StateMap = (props) => {
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


  let countiesUrl = '';
  if (props.showCounties) {
    countiesUrl = 'http://192.168.1.67:3002/api/v1/geography/counties/state/usps/al/all';
  }

  const [
    countiesData,
    countiesLoadingData,
    countiesLoadingDataError
  ] = useFetchData(countiesUrl, {'features': []});

  let wxDataUrl;
  if (props.showWeatherAlerts) {
    wxDataUrl = 'https://api.weather.gov/alerts/active/area/AL';
  }

  const [
    wxData,
    wxLoadingData,
    wxLoadingDataError
  ] = useFetchData(wxDataUrl, {'features': []});

  const statuses = [
    stateLoadingData,
    countiesLoadingData,
    wxLoadingData
  ];
  const errors = [
    stateLoadingDataError,
    countiesLoadingDataError,
    wxLoadingDataError
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
    // Map projection.
    // Alabama's geographic center: [ 32*50'5'', 86*38'50'']
    // Albers projection, like national map.
    // const projection = d3.geoAlbers()
    //   .parallels([30, 35])
    // Spherical Mercator, like NWS radar and rest of web.
    const projection = d3.geoMercator()
          .center([0, (32 + (50/60) + (5/3600))])
          .rotate([(86 + (38/60) + (50/3600)), 0])
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
            >
              {stateData.features.map((feat) => {
                return (
                  <path
                    key={feat.properties.GEOID}
                    d={path(feat)}
                    transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}
                  >
                  </path>
                );
              })}
            </clipPath>
            <clipPath
              id="statePathClipPath"
            >
              {stateData.features.map((feat) => {
                return (
                  <path
                    key={feat.properties.GEOID}
                    d={path(feat)}
                  >
                  </path>
                );
              })}
            </clipPath>
          </defs>
          <g>
            {stateData.features.map((feat) => {
              return (
                <path
                  className="state"
                  key={feat.properties.GEOID}
                  stroke="#000000"
                  strokeLinejoin="round"
                  d={path(feat)}
                  transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}
                  style={{
                    'fill': '#b20021'
                  }}
                >
                </path>
              );
            })}
          </g>
          <g>
            {countiesData.features.map((feat) => {
              return (
                <path
                  className="county"
                  key={feat.properties.GEOID}
                  stroke="#000000"
                  strokeLinejoin="round"
                  d={path(feat)}
                  transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}
                  style={{
                    'fill': '#b20021'
                  }}
                >
                </path>
              );
            })}
          </g>
          <MakePathGroup
            features={wxData.features}
            pathClassName="wxAlert"
            strokeColor="#0000ff"
            strokeLinejoin="round"
            pathFunction={path}
            getId={(feat) => {
              return feat.properties.id;
            }}
            marginLeft={dms.marginLeft}
            marginTop={dms.marginTop}
            styling={{
              'fill': '#0000ff',
              'opacity': '0.50'
            }}
            clipToState={props.clipToState}
            clipPath="statePathClipPath"
          />
          <Radar
            dms={dms}
            projection={projection}
            opacity="0.50"
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
