/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

export const MakePathGroup = (props) => {
  if (props.clipToState) {
    return (
      <g>
        {props.features.map((feat) => {
          return (
            <path
              className={props.pathClassName}
              key={props.getId(feat)}
              stroke={props.strokeColor}
              strokeLinejoin={props.strokeLinejoin}
              d={props.pathFunction(feat)}
              transform={`translate(${props.marginLeft}, ${props.marginTop})`}
              style={props.styling}
              clipPath={`url(#${props.clipPath})`}
            >
            </path>
          );
        })}
      </g>
    );
  }

  return (
    <g>
      {props.features.map((feat) => {
        return (
          <path
            className={props.pathClassName}
            key={props.getId(feat)}
            stroke={props.strokeColor}
            strokeLinejoin={props.strokeLinejoin}
            d={props.pathFunction(feat)}
            transform={`translate(${props.marginLeft}, ${props.marginTop})`}
            style={props.styling}
          >
          </path>
        );
      })}
    </g>
  );
}

export default MakePathGroup;
