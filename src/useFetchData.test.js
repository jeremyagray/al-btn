/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  renderHook,
} from '@testing-library/react-hooks';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import useFetchData from './useFetchData';

const url = '/api/state/al';

const server = setupServer(
  rest.get(
    'http://localhost/api/state/al',
    (_, response, context) => {
      return response(
        context.status(200),
        context.json({
          'name': 'Alabama',
          'geoid': '01',
          'usps': 'AL'
        }),
      )
    }
  ),
  rest.get(
    'http://localhost/api/state/error',
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

test('indicates loading the data', async () => {
  const { result } = renderHook(() => {
    return useFetchData('http://localhost/api/state/al');
  });

  expect(result.current[0]).toBe(null);
  expect(result.current[1]).toBe(true);
  expect(result.current[2]).toBe(null);
});

test('fetches the data', async () => {
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchData('http://localhost/api/state/al');
  });

  await waitForNextUpdate();

  expect(result.current[0].name).toBe('Alabama');
  expect(result.current[0].geoid).toBe('01');
  expect(result.current[0].usps).toBe('AL');
});

test('displays any errors', async () => {
  const { result, waitForNextUpdate } = renderHook(() => {
    return useFetchData('http://localhost/api/state/error');
  });

  await waitForNextUpdate();

  expect(result.current[0]).toBe(null);
  expect(result.current[1]).toBe(false);
  expect(result.current[2].name).toBe('Error');
  expect(result.current[2].message).toBe('Network Error');
});
