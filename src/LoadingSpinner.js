/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Spinner from 'react-bootstrap/Spinner';

export const LoadingSpinner = (props) => {
  return (
    <div
      className="d-flex mx-auto"
    >
      <Spinner
        animation="border"
        role="status"
        className="mx-auto my-auto"
      >
        <span className="visually-hidden">
          Loading data, please be patient.
        </span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
