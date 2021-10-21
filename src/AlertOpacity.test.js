/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

import AlertOpacity from './AlertOpacity';

test('renders the component', async () => {
  let opacity = '0.50';

  const updateAlertOpacity = (event) => {
    opacity = event.target.value;
  };

  let props = {
    'alertOpacity': opacity,
    'updateAlertOpacity': updateAlertOpacity
  };

  render(<AlertOpacity {...props} />);
  
  const ele = await screen.findByText(/Alert Opacity/i);
  expect(ele).toBeInTheDocument();

  const input = await screen.findByLabelText(/Alert Opacity/i);

  fireEvent.change(input, { 'target': { 'value': '0.75' }});
  expect(opacity).toBe('0.75');
  fireEvent.change(input, { 'target': { 'value': '-0.75' }});
  expect(opacity).toBe('0');
  fireEvent.change(input, { 'target': { 'value': '1.05' }});
  expect(opacity).toBe('1');
});
