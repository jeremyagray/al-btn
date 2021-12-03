/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  MemoryRouter as Router
} from 'react-router-dom';

import {
  act,
  render,
  screen
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import AccountDropdown from './AccountDropdown';

test('renders menu for authenticated user', async () => {
  render(<Router><AccountDropdown token={true} /></Router>);

  // Find the dropdown and assert it is present.
  const button = screen.getByRole('button', {'name': /^Account$/i});
  expect(button).toBeInTheDocument();

  // Click the dropdown.
  await act(async () => {
    await userEvent.click(button);
  });

  // Find the menu items and assert that they are present.
  expect(screen.getByRole('link', {'name': /logout/i}))
    .toHaveAttribute('href', '/logout');

  expect(screen.getByRole('link', {'name': /reset password/i}))
    .toHaveAttribute('href', '/password/reset');
});

test('renders menu for unauthenticated user', async () => {
  render(<Router><AccountDropdown token={false} /></Router>);

  // Find the dropdown and assert it is present.
  const button = screen.getByRole('button', {'name': /^Account$/i});
  expect(button).toBeInTheDocument();

  // Click the dropdown.
  await act(async () => {
    await userEvent.click(button);
  });

  // Find the menu items and assert that they are present.
  expect(screen.getByRole('link', {'name': /login/i}))
    .toHaveAttribute('href', '/login');

  expect(screen.getByRole('link', {'name': /register/i}))
    .toHaveAttribute('href', '/register');

  expect(screen.getByRole('link', {'name': /reset password/i}))
    .toHaveAttribute('href', '/password/reset');
});
