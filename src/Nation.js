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
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDataError, setLoadingDataError] = useState(null);

  useEffect(() => {
    const mapDataURL = 'http://127.0.0.1:3002/api/v1/geography/nation';

    let isMounted = true;
    setLoadingData(true);

    async function fetchData() {
      try {
        const mapResponse = await axios.get(mapDataURL);

        if (isMounted) {
          setMapData(mapResponse.data);
          setLoadingData(false);
          generateMap(mapData, props.projection, ref.current, dms);
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
  }, [mapData['type'], dms.boundedWidth, props.projection]);

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

const generateMap = (mapData, proj, element, dimensions) => {

  // Map projection.
  let projection;
  console.log(proj);
  if (proj === 'nation50') {
    projection = d3.geoAlbersUsa()
      .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], mapData);
  } else if (proj === 'nationSingle') {
    projection = d3.geoAlbers()
      .fitSize([dimensions.boundedWidth, dimensions.boundedHeight], mapData);
  }

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

  // Draw map.
  svg.append('g')
    .selectAll('path')
    .data(mapData.features)
    .enter()
    .append('path')
    .attr('class', 'nation')
    .style('fill', '#b20021')
    .style('border', '2px solid black')
    .attr('stroke', '#000000')
    .attr('stroke-linejoin', 'round')
    .attr('d', path)
    .attr('transform',
          `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`);

  svg
    .style('display', 'block')
    .style('visibility', 'visible')

}

export default NationMap;
