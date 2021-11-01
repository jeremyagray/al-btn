/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import GeographyConfig from './GeographyConfig.js';

test('renders the component', async () => {
  let props = {
    'currentState': 'AL',
    'updateCurrentState': jest.fn(),
    'clipToState': true,
    'toggleClipToState': jest.fn(),
    'showSurroundingStates': true,
    'toggleShowSurroundingStates': jest.fn(),
    'showCounties': true,
    'toggleShowCounties': jest.fn()
  };

  render(<GeographyConfig {...props} />);
  
  let ele = await screen.findByText(/Select State\/Territory/i);
  expect(ele).toBeInTheDocument();
  // ele = await screen.findByText(/clip to state/i);
  // expect(ele).toBeInTheDocument();
  // ele = await screen.findByText(/show surrounding states/i);
  // expect(ele).toBeInTheDocument();
  ele = await screen.findByText(/show counties/i);
  expect(ele).toBeInTheDocument();
});
