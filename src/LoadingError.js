/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

export const LoadingError = (props) => {
  if (props.errors.length) {
    return (
      <React.Fragment key="loadingErrors">
        {props.errors.map((error) => {
          return (
            <p className="loadingError" key={error.name}>
              Error loading data:  {error.message}
            </p>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key="noError">
    </React.Fragment>
  );
}

export default LoadingError;
