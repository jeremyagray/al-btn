/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
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
    '/home/gray/src/work/al-btn/src/capabilities.xml',
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

test('indicates loading the data', async () => {
  let cb;

  const { result } = renderHook(() => {
    return useFetchWmsCapabilities('kbmx', cb);
  });

  console.log(result.current);

  // expect(result.current.data).toBe([]);
  expect(result.current.isLoading).toBe(true);
  expect(result.current.loadingError).toBe(null);
});

test('fetches the data', async () => {
  let cb;

  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchWmsCapabilities('kbmx', cb);
  });

  await waitForNextUpdate();

  // console.log(result.current.data);

  expect(result.current.isLoading).toBe(false);
  expect(result.current.loadingError).toBe(null);
});

// test('displays any errors', async () => {
//   let cb;

//   const { result, waitForNextUpdate } = renderHook(() => {
//     return useFetchWmsCapabilities('kerr', cb);
//   });

//   await waitForNextUpdate();

//   expect(result.current[0]).toBe(null);
//   expect(result.current[1]).toBe(false);
//   expect(result.current[2].name).toBe('Error');
//   expect(result.current[2].message).toBe('Network Error');
// });
