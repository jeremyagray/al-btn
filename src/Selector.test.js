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

import Selector from './Selector';

let props = {
  'visualization': 'national',
  'visualizations': [
    {
      'value': 'national',
      'key': 'national',
      'title': 'national map',
    },
    {
      'value': 'states',
      'key': 'states',
      'title': 'state map',
    }
  ],
  'updateVisualization': (event) => {
    props.visualization = event.target.value;
  }
};

test('renders selector', () => {
  render(<Selector {...props} />);
  
  expect(
    screen
      .getByLabelText('Select Visualization'))
    .toBeInTheDocument();
});

test('selector changes visualization', () => {
  render(<Selector {...props} />);
  
  expect(screen.getByLabelText('Select Visualization')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Select Visualization'), {'target': {'value': 'states' }});
  expect(props.visualization).toBe('states');
});
