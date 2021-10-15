/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import React from 'react';

export const LoadingError = (props) => {
  if (props.errors) {
    return (
      <React.Fragment>
        {props.errors.map((error) => {
          if (error) {
            return (
              <p className="loadingError">
                Error loading data:  {error.message}
              </p>
            );
          }
        })}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default LoadingError;
