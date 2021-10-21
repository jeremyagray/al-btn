/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import AlertConfig from './AlertConfig';

let opacity = '0.50';

const updateAlertOpacity = (event) => {
  opacity = event.target.value;
};

test('renders the component when displaying alerts', async () => {
  let props = {
    'showWeatherAlerts': true,
    'alertOpacity': opacity,
    'updateAlertOpacity': updateAlertOpacity
  };

  render(<AlertConfig {...props} />);
  
  const ele = await screen.findByText(/Alert Opacity/i);
  expect(ele).toBeInTheDocument();
});

test('does not render the component when not displaying alerts', async () => {
  let props = {
    'showWeatherAlerts': false,
    'alertOpacity': opacity,
    'updateAlertOpacity': updateAlertOpacity
  };

  render(<AlertConfig {...props} />);
  
  expect(() => { screen.getByText(/Alert Opacity/i); }).toThrow();
});
