/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import Header from './Header';

test('renders navbar brand', () => {
  render(<Header />);

  expect(screen.getByRole('link', {'name': /AL\:\s*BTN/i}))
    .toHaveAttribute('href', '/');

  expect(screen.getByRole('link', {'name': /Alabama\:\s*By\s*the\s*Numbers/i}))
    .toHaveAttribute('href', '/');
});

test('renders contact link with correct target', () => {
  render(<Header />);

  expect(screen.getByRole('link', {'name': /contact/i}))
    .toHaveAttribute('href', '/contact');
});
