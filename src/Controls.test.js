/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import Controls from './Controls.js';

// Mock `ResizeObserver`.
jest.mock('@juggle/resize-observer');

// Not in jsdom, and hence jest, apparently.  Mock it.
window.URL.createObjectURL = jest.fn();

const visualizations = [
  {
    'value': 'national',
    'key': 'national',
    'title': 'national map',
  },
  {
    'value': 'weather',
    'key': 'weather',
    'title': 'weather',
  }
];

let props = {
  'map': {
    'current': null
  },
  'visualization': '',
  'visualizations': visualizations,
  'updateVisualization': jest.fn(),
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

// test('renders the `Selector` component', async () => {
//   props.visualization = 'national';
//   render(<Controls {...props} />);
  
//   let ele = await screen.findByText(/Select Visualization/i);
//   expect(ele).toBeInTheDocument();
// });

test('renders the `Config` component', async () => {
  // props.visualization = 'national';
  // render(<Controls {...props} />);
  
  // let ele = await screen.findByText(/Select Projection/i);
  // expect(ele).toBeInTheDocument();

  props.visualization = 'weather';
  render(<Controls {...props} />);
  
  let ele = await screen.findByText(/Select State\/Territory/i);
  expect(ele).toBeInTheDocument();
});
