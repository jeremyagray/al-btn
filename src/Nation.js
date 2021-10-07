/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  useEffect,
  useState
} from 'react';

// D3.
import * as d3 from 'd3';
import { geoAlbersUsaTerritories } from 'd3-composite-projections';

// Other stuff.
import axios from 'axios';

// Local components.
import useChartDimensions from './useChartDimensions';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';

export const NationMap = (props) => {
  return (
    <div className="NationMap">
      <NationMapSVG
        projection={props.projection}
        showStates={props.showStates}
      />
    </div>
  );
}

const NationMapSVG = (props) => {
  // Dimensions.
  const [ref, dms] = useChartDimensions({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  });

  // Data state.
  const [mapData, setMapData] = useState({'type': ''});
  const [stateData, setStateData] = useState({'type': ''});
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDataError, setLoadingDataError] = useState(null);

  useEffect(() => {
    const mapDataURL = 'http://192.168.1.67:3002/api/v1/geography/nation';
    const stateDataURL = 'http://192.168.1.67:3002/api/v1/geography/states/all';

    let isMounted = true;
    setLoadingData(true);

    async function fetchData() {
      try {
        const mapResponse = await axios.get(mapDataURL);
        let stateResponse;
        if (props.showStates) {
          stateResponse = await axios.get(stateDataURL);
        }

        if (isMounted) {
          setMapData(mapResponse.data);
          if (props.showStates) {
            setStateData(stateResponse.data);
          }
          setLoadingData(false);
          if (props.showStates) {
            generateMap(mapData, stateData, props.projection, ref.current, dms);
          } else {
            generateMap(mapData, [], props.projection, ref.current, dms);
          }
        }
      } catch (error) {
        if (isMounted) {
          setLoadingDataError(error);
          setLoadingData(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData['type'], stateData['type'], dms.boundedWidth, props.projection, props.showStates]);

  if (loadingData) {
    return (
      <LoadingSpinner vizRef={ref} />
    );
  } else if (loadingDataError) {
    return (
      <LoadingError
        vizRef={ref}
        errorMessage={loadingDataError.message}
      />
    );
  }

  return (
    <div
      id="viz"
      ref={ref}
    />
  );
}

const generateMap = (mapData, stateData, proj, element, dimensions) => {

  // Map projection.
  let projection;
  if (proj === 'nation50') {
    projection = d3.geoAlbersUsa()
      .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], mapData);
  } else if (proj === 'nationAll') {
    projection = geoAlbersUsaTerritories()
      .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], mapData);
  } else if (proj === 'nationSingle') {
    projection = d3.geoAlbers()
      .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], mapData);
  }

  // Path generator.
  const path = d3.geoPath()
        .projection(projection);

  // Visualization SVG.
  const svg = d3.select(element)
    .append('svg')
    .attr("id", "mapSVG")
    .attr("height", dimensions.height)
    .attr("width", dimensions.width)
    .style('background-color', '#ffffff')
    .style('display', 'none')
    .style('visibility', 'hidden');

  // Draw national boundaries.
  svg
    .selectAll('path')
    .data(mapData.features)
    .join('path')
    .attr('class', 'nation')
    .style('fill', '#b20021')
    .attr('stroke', '#000000')
    .attr('stroke-linejoin', 'round')
    .attr('d', path)
    .attr('transform',
          `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`);

  // Draw state boundaries.
  if (stateData.features) {
    svg
      .selectAll('path')
      .data(stateData.features)
      .join('path')
      .attr('class', 'state')
      .style('fill', '#b20021')
      .attr('stroke', '#000000')
      .attr('stroke-linejoin', 'round')
      .attr('d', path)
      .attr('transform',
            `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`);
  }

  svg
    .style('display', 'block')
    .style('visibility', 'visible')
}

export default NationMap;