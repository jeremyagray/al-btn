/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as path from 'path'
import * as fs from 'fs'

import RadarLegend from './RadarLegend';

const server = setupServer(
  rest.get(
    'https://opengeo.ncep.noaa.gov/geoserver/styles/reflectivity.png',
    (_, response, context) => {
    const imageBuffer = fs.readFileSync(path.resolve(__dirname, './reflectivity.png'));

    return response(
      context.set('Content-Length', imageBuffer.byteLength.toString()),
      context.set('Content-Type', 'image/png'),
      context.body(imageBuffer),
    )
  }),
);

// Not in jsdom, and hence jest, apparently.  Mock it.
window.URL.createObjectURL = jest.fn();

// Start the server.
beforeAll(() => server.listen());
// Clean slate for each test.
afterEach(() => {
  server.resetHandlers();
  window.URL.createObjectURL.mockReset();
});
// Stop the server.
afterAll(() => server.close());

test('renders the legend when showing radar', async () => {
  let props = {
    'showRadar': true
  };

  render(<RadarLegend {...props} />);
  
  const ele = await screen.findByText(/Radar Legend/i);
  expect(ele).toBeInTheDocument();
});

test('does not render the legend when not showing radar', () => {
  let props = {
    'showRadar': false
  };

  render(<RadarLegend {...props} />);
  
  expect(() => { screen.getByText('Radar Legend'); }).toThrow();
});
