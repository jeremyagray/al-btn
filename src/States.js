/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// Other stuff.
import useFetchData from './useFetchData';

const States = (props) => {
  let statesUrl = `http://192.168.1.67:3002/api/v1/geography/states/usps/${props.currentState.toLowerCase()}`;

  if (props.showSurroundingStates) {
    statesUrl = `http://192.168.1.67:3002/api/v1/geography/states/within/${props.currentState.toLowerCase()}/distance/480000`;
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
