/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import Config from './Config.js';

// Not in jsdom, and hence jest, apparently.  Mock it.
window.URL.createObjectURL = jest.fn();

let props = {
  'visualization': '',
  'projection': 'nation50',
  'updateProjection': jest.fn(),
  'currentState': 'AL',
  'updateCurrentState': jest.fn(),
  'clipToState': true,
  'toggleClipToState': jest.fn(),
  'showSurroundingStates': true,
  'toggleShowSurroundingStates': jest.fn(),
  'showCounties': true,
  'toggleShowCounties': jest.fn(),
  'showWeatherAlerts': true,
  'toggleShowWeatherAlerts': jest.fn(),
  'showStates': true,
  'toggleShowStates': jest.fn(),
  'showRadar': true,
  'toggleShowRadar': jest.fn(),
  'radarStation': 'KBMX',
  'updateRadarStation': jest.fn(),
  'showRadarStations': true,
  'toggleShowRadarStations': jest.fn(),
  'radarOpacity': '0.50',
  'updateRadarOpacity': jest.fn(),
  'alertOpacity': '0.50',
  'updateAlertOpacity': jest.fn()
};

test('renders the national component', async () => {
  props.visualization = 'national';
  render(<Config {...props} />);
  
  let ele = await screen.findByText(/Select Projection/i);
  expect(ele).toBeInTheDocument();
});

test('renders the weather component', async () => {
  props.visualization = 'weather';
  render(<Config {...props} />);
  
  let ele = await screen.findByText(/Select State\/Territory/i);
  expect(ele).toBeInTheDocument();
});
