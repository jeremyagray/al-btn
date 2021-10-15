/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

test('renders the spinner', () => {
  let props = {};

  render(<LoadingSpinner {...props} />);
  
  expect(screen.getByText('Loading data, please be patient.')).toBeInTheDocument();
});
