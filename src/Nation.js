/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// D3.
import * as d3 from 'd3';
import { geoAlbersUsaTerritories } from 'd3-composite-projections';

// Local components.
import useChartDimensions from './useChartDimensions';
import useFetchData from './useFetchData';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';

export const NationMap = (props) => {
  const [ref, dms] = useChartDimensions({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  });

  const [
    nationData,
    nationLoadingData,
    nationLoadingDataError
  ] = useFetchData('http://192.168.1.67:3002/api/v1/geography/nation');

  if (nationLoadingData) {
    return (
      <div
        className="visualization d-flex"
        ref={ref}
      >
        <LoadingSpinner />
      </div>
    );
  } else if (nationLoadingDataError) {
    return (
      <div
        className="visualization"
        ref={ref}
      >
        <LoadingError
          errorMessage={nationLoadingDataError.message}
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
        </svg>
      </div>
    );
  }
}

export default NationMap;
