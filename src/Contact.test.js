/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import Contact from './Contact';

test('renders the header', async () => {
  render(<Contact />);
  
  const ele = await screen.findByRole('heading', { 'name': /Contact/i });
  expect(ele).toBeInTheDocument();
});

test('renders the privacy statement', async () => {
  render(<Contact />);
  
  const ele = await screen.findByText(/All information entered here/i);
  expect(ele).toBeInTheDocument();
});

test('renders the form elements', async () => {
  render(<Contact />);
  
  const name = await screen.findByLabelText(/Name/i);
  expect(name).toBeInTheDocument();
  
  const email = await screen.findByLabelText(/Email/i);
  expect(email).toBeInTheDocument();
  
  const message = await screen.findByLabelText(/Message/i);
  expect(message).toBeInTheDocument();
  
  const antiSpam = await screen.findByPlaceholderText(/spammer/i);
  expect(antiSpam).toBeInTheDocument();
  
  const button = await screen.findByRole('button', { 'name': /Submit/i });
  expect(button).toBeInTheDocument();
});
