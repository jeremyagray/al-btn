/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

export const LoadingError = (props) => {
  return (
    <div>
      {props.errors.map((error) => {
        if (error) {
          return (
            <p>
              Error loading data:  {error.message}
            </p>
          );
        }

        return (<></>);
      })}
    </div>
  );
}

export default LoadingError;
