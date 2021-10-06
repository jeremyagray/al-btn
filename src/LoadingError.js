/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

export const LoadingError = (props) => {
  return (
    <div
      id="viz"
      ref={props.vizRef}
    >
      <p>
        Error loading data:  {props.errorMessage}
      </p>
    </div>
  );
}

export default LoadingError;
