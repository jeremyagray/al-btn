/**
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

import {
  useAuth
} from 'react-oidc-context';

// React Bootstrap.
import Button from 'react-bootstrap/Button';

import './Logout.css';

export const Logout = (props) => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <main>
        <button onClick={() => auth.signoutRedirect()}>Logout</button>
      </main>
    );
  }

  return (
    <main>
      <h2>
        Not Logged In
      </h2>
      <p>
        You have to log in before logging out if you really want to log out.
      </p>
    </main>
  );
};

export default Logout;
