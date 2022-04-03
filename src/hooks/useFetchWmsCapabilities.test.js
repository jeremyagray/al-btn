/**
 *
 * dark-blue-yonder, custom view of NWS radar, alert, and weather data
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 */

import {
  act,
  renderHook
} from '@testing-library/react-hooks';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fs from 'fs';

import useFetchWmsCapabilities from './useFetchWmsCapabilities.js';

const loadXmlCapabilities = () => {
  return fs.readFileSync(
    '/home/gray/src/work/al-btn/src/hooks/capabilities.xml',
    {'encoding': 'utf-8'}
  );
};

const server = setupServer(
  rest.get(
    'https://opengeo.ncep.noaa.gov/geoserver/kbmx/ows',
    (_, response, context) => {
      return response(
        context.status(200),
        context.xml(loadXmlCapabilities()),
      )
    }
  ),
  rest.get(
    'https://opengeo.ncep.noaa.gov/geoserver/kerr/ows',
    (_, response, context) => {
      return response.networkError('throw an error');
    }
  )
);

// Start the server.
beforeAll(() => server.listen());

// Clean slate for each test.
afterEach(() => {
  server.resetHandlers();
});

// Stop the server.
afterAll(() => server.close());

test('should indicate that data is loading', async () => {
  let cb;

  const { result } = renderHook(() => {
    return useFetchWmsCapabilities('kbmx', cb);
  });

  expect(result.current.data.length).toBe(0);
  expect(result.current.isLoading).toBe(true);
  expect(result.current.loadingError).toBe(null);
});

test('should fetch data', async () => {
  let cb;

  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchWmsCapabilities('kbmx', cb);
  });

  await waitForNextUpdate();

  expect(result.current.data.length).toBe(12);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.loadingError).toBe(null);
});

test('should fetch no data without a site', async () => {
  let cb;

  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchWmsCapabilities(null, cb);
  });

  // No updates with no site.
  // await waitForNextUpdate();

  expect(result.current.data.length).toBe(0);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.loadingError).toBe(null);
});

test('should display any errors', async () => {
  let cb;

  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchWmsCapabilities('kerr', cb);
  });

  await waitForNextUpdate();

  expect(result.current.data.length).toBe(0);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.loadingError.name).toBe('Error');
  expect(result.current.loadingError.message).toBe('Network Error');
});
