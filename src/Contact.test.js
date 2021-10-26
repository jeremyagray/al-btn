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

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Contact from './Contact';

const server = setupServer(
  rest.post(
    '*/api/v1/contact/message',
    (request, response, context) => {
      if (request.body.contactName && request.body.contactEmail && request.body.contactMessage) {
        if (! request.body.contactSpam) {
          return response(
            context.status(200),
            context.json({
              'message': 'Thanks for contacting us!',
            }),
          );
        }

        return response(
          context.status(200),
          context.json({
            'message': 'Thanks!',
          }),
        );
      }

      return response(
        context.status(500),
        context.json({
          'error': 'server error',
        }),
      );
    }
  )
);

// Start the server.
beforeAll(() => server.listen());
// Clean slate for each test.
afterEach(() => {
  server.resetHandlers();
});
// Stop the server.
afterAll(() => server.close());

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

test('updates the name on entry', async () => {
  render(<Contact />);
  const name = await screen.findByLabelText(/Name/i);
  fireEvent.change(name, {'target': {'value': 'Jon Doe'}});
  expect(name.value).toBe('Jon Doe');
});

test('updates the email on entry', async () => {
  render(<Contact />);
  const email = await screen.findByLabelText(/Email/i);
  fireEvent.change(email, {'target': {'value': 'jd@example.net'}});
  expect(email.value).toBe('jd@example.net');
});

test('updates the message on entry', async () => {
  render(<Contact />);
  const message = await screen.findByLabelText(/Message/i);
  fireEvent.change(message, {'target': {'value': 'This is only a test.'}});
  expect(message.value).toBe('This is only a test.');
});

test('updates the antispam on entry', async () => {
  render(<Contact />);
  const spam = await screen.findByPlaceholderText(/spammer/i);
  fireEvent.change(spam, {'target': {'value': 'not spam!'}});
  expect(spam.value).toBe('true');
});

test('submits a good contact message', async () => {
  render(<Contact />);
  const name = await screen.findByLabelText(/Name/i);
  fireEvent.change(name, {'target': {'value': 'Jon Doe'}});
  const email = await screen.findByLabelText(/Email/i);
  fireEvent.change(email, {'target': {'value': 'jd@example.net'}});
  const message = await screen.findByLabelText(/Message/i);
  fireEvent.change(message, {'target': {'value': 'This is only a test.'}});
  const spam = await screen.findByPlaceholderText(/spammer/i);

  const form = await screen.findByRole('form');
  fireEvent.submit(form);

  await waitFor(() => {
    expect(name.value).toBe('');
    expect(email.value).toBe('');
    expect(message.value).toBe('');
    expect(spam.value).toBe('');
  });

  const serverResponse = await screen.findByText(/Thanks for contacting us!/i);
  expect(serverResponse).toBeInTheDocument();
});

test('submits a spammy contact message', async () => {
  render(<Contact />);
  const name = await screen.findByLabelText(/Name/i);
  fireEvent.change(name, {'target': {'value': 'Jon Doe'}});
  const email = await screen.findByLabelText(/Email/i);
  fireEvent.change(email, {'target': {'value': 'jd@example.net'}});
  const message = await screen.findByLabelText(/Message/i);
  fireEvent.change(message, {'target': {'value': 'This is only a test.'}});
  const spam = await screen.findByPlaceholderText(/spammer/i);
  fireEvent.change(spam, {'target': {'value': 'spam!'}});

  const form = await screen.findByRole('form');
  fireEvent.submit(form);

  await waitFor(() => {
    expect(name.value).toBe('');
    expect(email.value).toBe('');
    expect(message.value).toBe('');
    expect(spam.value).toBe('');
  });

  const serverResponse = await screen.findAllByText(/Thanks!/i);
  expect(serverResponse[0]).toBeInTheDocument();
});

test('flags a bad contact message', async () => {
  render(<Contact />);
  const name = await screen.findByLabelText(/Name/i);
  fireEvent.change(name, {'target': {'value': ''}});
  const email = await screen.findByLabelText(/Email/i);
  fireEvent.change(email, {'target': {'value': 'jd@example.net'}});
  const message = await screen.findByLabelText(/Message/i);
  fireEvent.change(message, {'target': {'value': 'This is only a test.'}});
  const spam = await screen.findByPlaceholderText(/spammer/i);
  fireEvent.change(spam, {'target': {'value': ''}});

  const form = await screen.findByRole('form');
  fireEvent.submit(form);

  await waitFor(() => {
    expect(name.value).toBe('');
    expect(email.value).toBe('jd@example.net');
    expect(message.value).toBe('This is only a test.');
    expect(spam.value).toBe('false');
  });

  const serverResponse = await screen.findByText(/server error/i);
  expect(serverResponse).toBeInTheDocument();
});
