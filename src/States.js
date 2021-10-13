/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// Other stuff.
import useFetchData from './useFetchData';

// Haversine distance, after https://stackoverflow.com/a/21623206/12968623
const distance = (lat1, lon1, lat2, lon2) => {
  // Radian conversion (Math.PI / 180).
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2
            + c(lat1 * p) * c(lat2 * p)
            * (1 - c((lon2 - lon1) * p)) / 2;

  // Calculation done on unit sphere.  Scale appropriately.
  // R = 6371 km, D = 12742 km
  return 12742 * Math.asin(Math.sqrt(a));
}

const States = (props) => {
  let statesUrl = `http://192.168.1.67:3002/api/v1/geography/states/usps/${props.currentState.toLowerCase()}`;

  const [
    centroid
  ] = useFetchData(`http://192.168.1.67:3002/api/v1/geography/states/centroid/usps/${props.currentState.toLowerCase()}`);

  if (props.showSurroundingStates) {
    // Update radius to fit dimensions.
    const corner = props.projection.invert([-props.dms.marginLeft, -props.dms.marginTop]);
    const radius = Math.ceil(distance(centroid.coordinates[1], centroid.coordinates[0], corner[1], corner[0]) * 1000);

    statesUrl = `http://192.168.1.67:3002/api/v1/geography/states/within/${props.currentState.toLowerCase()}/distance/${radius}`;
  }

  const [
    statesData
  ] = useFetchData(statesUrl, {'features': []});

  if (statesData && statesData.features) {
    return (
      <React.Fragment
        key="states-fragment"
      >
        <g
          key="states-group"
        >
          {statesData.features.map((state) => {
            return (
              <path
                className="state"
                key={state.properties.geoid}
                stroke={props.stroke}
                strokeLinejoin={props.strokeLinejoin}
                d={props.pathFunction(state)}
                transform={`translate(${props.dms.marginLeft}, ${props.dms.marginTop})`}
                style={{
                  'fill': props.colorFunction()
                }}
              >
              </path>
            );
          })}
        </g>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment
      key="states-fragment"
    >
    </React.Fragment>
  );
}

export default States;
