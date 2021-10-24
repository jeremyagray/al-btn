/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import ShallowRenderer from 'react-test-renderer/shallow';

import Body from './Body';

test('renders the body', async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Body />);
  const result = renderer.getRenderOutput();
  
  expect(result.type).toBe('div');
});
