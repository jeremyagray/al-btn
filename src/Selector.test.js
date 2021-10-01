/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import Selector from './Selector';

test('renders selector', () => {
  render(<Selector />);
  expect(
    screen
      .getByLabelText('Data Set:'))
    .toBeInTheDocument();
});
