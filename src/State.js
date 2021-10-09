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

  const statuses = [
    stateLoadingData,
    countiesLoadingData
  ];
  const errors = [
    stateLoadingDataError,
    countiesLoadingDataError
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
    const projection = d3.geoAlbers()
          .parallels([30, 35])
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
        </svg>
      </div>
    );
  }
}

export default StateMap;
