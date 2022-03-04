/**
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";

import {
  AuthProvider
} from 'react-oidc-context';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

const conf = {
  'authority': 'http://localhost:3200',
  'client_id': 'AL:BTN',
  'redirect_uri': 'http://localhost:3001/login',
  'grant_type': 'authorization_code refresh_token',
  'scope': 'openid offline_access',
  'post_logout_redirect_uri': 'http://localhost:3001/login'
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider {...conf}>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
