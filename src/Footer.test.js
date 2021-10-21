/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import Footer from './Footer';

test('renders the component', async () => {
  let props = {
  };

  render(<Footer {...props} />);
  
  const ele = await screen.findByText(/Developed and hosted by/i);
  expect(ele).toBeInTheDocument();
});
