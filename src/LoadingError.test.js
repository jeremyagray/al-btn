/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import LoadingError from './LoadingError';

test('renders with no errors', () => {
  let props = {
    'errors': [
    ]
  }

  render(<LoadingError {...props} />);
  
  expect(() => { screen.getByText('Error loading'); }).toThrow();
});
