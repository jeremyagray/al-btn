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

// D3 and friends.
import * as d3 from 'd3';

// Other stuff.
import axios from 'axios';
import useChartDimensions from './useChartDimensions';

// Local components.
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadingError';

function StateMap() {
  return (
    <div className="StateMap">
      <StateMapSVG />
    </div>
  );
}

function StateMapSVG() {
  // Dimensions.
  const [ref, dms] = useChartDimensions({
    'marginTop': 30,
    'marginRight': 30,
    'marginBottom': 30,
    'marginLeft': 30
  });

  // Data state.
  const [stateData, setStateData] = useState({'type': ''});
  const [countyData, setCountyData] = useState({'type': ''});
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDataError, setLoadingDataError] = useState(null);

  useEffect(() => {
    const stateDataURL = 'http://192.168.1.67:3002/api/v1/geography/states/usps/al';
    const countyDataURL = 'http://192.168.1.67:3002/api/v1/geography/counties/state/usps/al/all';

    let isMounted = true;
    setLoadingData(true);

    async function fetchData() {
      try {
        const stateResponse = await axios.get(stateDataURL);
        const countyResponse = await axios.get(countyDataURL);

        if (isMounted) {
          setStateData(stateResponse.data);
          setCountyData(countyResponse.data);
          setLoadingData(false);
          generateMap(stateData, countyData, ref.current, dms);
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
  }, [stateData['type'], countyData['type'], dms.boundedWidth]);

  if (loadingData) {
    return (
      <LoadingSpinner
        vizRef={ref}
      />
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

function generateMap(stateData, countyData, element, dimensions) {

  // Alabama's geographic center: [ 32*50'5'', 86*38'50'']
  const projection = d3.geoAlbers()
        .parallels([30, 35])
        .center([0, (32 + (50/60) + (5/3600))])
        .rotate([(86 + (38/60) + (50/3600)), 0])
        .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], stateData.features[0]);

  // Path generator.
  const path = d3.geoPath()
        .projection(projection);

  // Visualization SVG.
  d3.selectAll('svg').remove();
  const svg = d3.select(element)
        .append("svg")
        .attr("id", "mapSVG")
        .attr("height", dimensions.height)
        .attr("width", dimensions.width)
        .style('background-color', '#ffffff')
        .style('display', 'none')
        .style('visibility', 'hidden')

  // Draw states.
  svg.append('g')
      .selectAll('path')
      .data(stateData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .style('fill', '#b20021')
      .style('border', '2px solid black')
      .attr('stroke', '#000000')
      .attr('stroke-linejoin', 'round')
      .attr('d', path)
      .attr('transform',
            `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`);

  // Draw counties.
  if (countyData.features) {
    svg.append('g')
      .selectAll('path')
      .data(countyData.features)
      .enter()
      .append('path')
      .attr('class', 'county')
      .style('fill', '#b20021')
      .style('border', '2px solid black')
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

export default StateMap;
