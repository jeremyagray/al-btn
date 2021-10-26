/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import * as path from 'path'
// import * as fs from 'fs'

import RadarStationSelect from './RadarStationSelect';

// const server = setupServer(
//   rest.get(
//     'https://opengeo.ncep.noaa.gov/geoserver/styles/reflectivity.png',
//     (_, response, context) => {
//     const imageBuffer = fs.readFileSync(path.resolve(__dirname, './reflectivity.png'));

//     return response(
//       context.set('Content-Length', imageBuffer.byteLength.toString()),
//       context.set('Content-Type', 'image/png'),
//       context.body(imageBuffer),
//     )
//   }),
// );

// // Not in jsdom, and hence jest, apparently.  Mock it.
// window.URL.createObjectURL = jest.fn();

// // Start the server.
// beforeAll(() => server.listen());
// // Clean slate for each test.
// afterEach(() => {
//   server.resetHandlers();
//   window.URL.createObjectURL.mockReset();
// });
// // Stop the server.
// afterAll(() => server.close());

test('renders the radar station selector with in-state stations', async () => {
  const props = {
    'currentState': 'AL',
    'showRadar': true,
    'showSurroundingStates': false,
    'radarStation': '',
    'updateRadarStation': jest.fn(),
  };

  render(<RadarStationSelect {...props} />);
  
  const ele = await screen.findByText(/Available Radar Stations/i);
  expect(ele).toBeInTheDocument();
});

test('renders the radar station selector with surrounding state stations', async () => {
  const props = {
    'currentState': 'AL',
    'showRadar': true,
    'showSurroundingStates': true,
    'radarStation': '',
    'updateRadarStation': jest.fn(),
  };

  render(<RadarStationSelect {...props} />);
  
  const ele = await screen.findByText(/Available Radar Stations/i);
  expect(ele).toBeInTheDocument();
});

test('does not render the radar station selector when not showing radar', () => {
  const props = {
    'currentState': 'AL',
    'showRadar': false,
    'showSurroundingStates': true,
    'radarStation': '',
    'updateRadarStation': jest.fn(),
  };

  render(<RadarStationSelect {...props} />);
  
  expect(() => { screen.getByText('Available Radar Stations'); }).toThrow();
});
