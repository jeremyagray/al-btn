/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import RadarConfig from './RadarConfig';

test('render the radar configuration when showing radar', async () => {
  const props = {
    'currentState': 'AL',
    'showSurroundingStates': true,
    'showRadar': true,
    'radarStation': '',
    'updateRadarStation': jest.fn(),
    'showRadarStations': true,
    'toggleShowRadarStations': jest.fn(),
    'radarOpacity': '0.50',
    'updateRadarOpacity': jest.fn()
  };

  render(<RadarConfig {...props} />);
  
  const ele = await screen.findByText(/Available Radar Stations/i);
  expect(ele).toBeInTheDocument();
});

test('do not render the radar configuration when not showing radar', async () => {
  const props = {
    'currentState': 'AL',
    'showSurroundingStates': true,
    'showRadar': false,
    'radarStation': '',
    'updateRadarStation': jest.fn(),
    'showRadarStations': true,
    'toggleShowRadarStations': jest.fn(),
    'radarOpacity': '0.50',
    'updateRadarOpacity': jest.fn()
  };

  render(<RadarConfig {...props} />);
  
  expect(() => { screen.getByText('Available Radar Stations'); }).toThrow();
});
