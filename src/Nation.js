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
import {
  forwardRef
} from 'react';
import React from 'react';

// D3.
import * as d3 from 'd3';
import { geoAlbersUsaTerritories } from 'd3-composite-projections';

// Local hooks and components.
import { useChartDimensionsWithRef } from './hooks/useChartDimensions';
import useFetchData from './hooks/useFetchData';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';
import RadarStations from './RadarStations';

export const NationMap = forwardRef((props, ref) => {
  const [dms] = useChartDimensionsWithRef({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  }, ref);

  const [
    nationData,
    nationLoadingData,
    nationLoadingDataError
  ] = useFetchData('http://192.168.1.67:3002/api/v1/geography/nation');

  let statesUrl = '';
  if (props.showStates) {
    statesUrl = 'http://192.168.1.67:3002/api/v1/geography/states/all';
  }

  const [
    statesData,
    statesLoadingData,
    statesLoadingDataError
  ] = useFetchData(statesUrl, {'features': []});

  const statuses = [
    nationLoadingData,
    statesLoadingData
  ];
  const errors = [
    nationLoadingDataError,
    statesLoadingDataError
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
    // Map projection.
    let projection;
    if (props.projection === 'nation50') {
      projection = d3.geoAlbersUsa()
        .fitSize([dms.boundedWidth, dms.boundedHeight], nationData);
    } else if (props.projection === 'nationAll') {
      projection = geoAlbersUsaTerritories()
        .fitSize([dms.boundedWidth, dms.boundedHeight], nationData);
    } else if (props.projection === 'nationSingle') {
      projection = d3.geoAlbers()
        .fitSize([dms.boundedWidth, dms.boundedHeight], nationData);
    }

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
          <g>
            {nationData.features.map((feat) => {
              return (
                <path
                  className="nation"
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
            {statesData.features.map((feat) => {
              return (
                <path
                  className="state"
                  key={feat.properties.geoid}
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
          <RadarStations
            showRadarStations={props.showRadarStations}
            projection={projection}
            dms={dms}
          />
        </svg>
      </React.Fragment>
    );
  }
});

export default NationMap;
