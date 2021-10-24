/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  render,
  screen,
} from '@testing-library/react';

import {
  Switch,
} from "react-router-dom";

import ShallowRenderer from 'react-test-renderer/shallow';

import App from './App';
import Footer from './Footer.js';
import Header from './Header.js';

test('renders the app', async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  
  expect(result.type).toBe('div');
  expect(result.props.children).toContainEqual(<Header />);
  expect(result.props.children).toContainEqual(<Footer />);
});
