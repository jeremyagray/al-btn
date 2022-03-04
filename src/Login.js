/**
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

// React.
import {
  useState
} from 'react';

import {
  useAuth
} from 'react-oidc-context';

import './Login.css';

export const Login = (props) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <main>
        Loading...
      </main>
    );
  }

  if (auth.error) {
    return (
      <main>
        <h2>
          Login Failed
        </h2>
        <p>
          {auth.error.message}
        </p>
      </main>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <main>
        <section>
          <h2>
            Login Successful
          </h2>
          <p>
            Welcome back, {auth.user?.profile.sub}.
          </p>
        </section>
        <section className="mb-auto me-auto">
          <button onClick={() => auth.signoutRedirect()}>Logout</button>
        </section>
      </main>
    );
  }

  return (
    <main className="mb-auto me-auto">
      <section>
        <h2>
          Login
        </h2>
        <p>
          Login to customize and access all site features.
        </p>
      </section>
      <section className="mb-auto me-auto">
        <button onClick={() => auth.signinRedirect()}>Login</button>
      </section>
    </main>
  );
};

export default Login;
