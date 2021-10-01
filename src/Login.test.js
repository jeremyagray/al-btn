/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen
} from '@testing-library/react';

import Login from './Login';

test('renders login heading', () => {
  render(<Login />);

  expect(
    screen
      .getByRole('heading'))
    .toHaveTextContent('Login');
});

test('renders email form control', () => {
  render(<Login />);

  expect(
    screen
      .getByLabelText('Email'))
    .toBeInTheDocument();
});

test('renders password form control', () => {
  render(<Login />);

  expect(
    screen
      .getByLabelText('Password'))
    .toBeInTheDocument();
});

test('renders login button', () => {
  render(<Login />);

  expect(
    screen
      .getByRole('button'))
    .toHaveTextContent('Login');
});
