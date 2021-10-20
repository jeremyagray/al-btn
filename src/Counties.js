/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

// Other stuff.
import useFetchData from './useFetchData';

const Counties = (props) => {
  let countiesUrl = '';
  if (props.showCounties) {
    countiesUrl = `http://192.168.1.67:3002/api/v1/geography/counties/state/usps/${props.currentState}/all`;
  }

  const [
    countiesData,
    loading,
    error
  ] = useFetchData(countiesUrl, {'features': []});

  if (props.showCounties && ! loading && ! error) {
    return (
      <React.Fragment
        key="counties-fragment"
      >
        <g
          key="counties-group"
        >
          {countiesData.features.map((feat) => {
            return (
              <path
                className="county"
                key={feat.properties.GEOID}
                stroke={props.stroke}
                strokeLinejoin={props.strokeLinejoin}
                d={props.pathFunction(feat)}
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
      key="counties-fragment"
    >
    </React.Fragment>
  );
}

export default Counties;
