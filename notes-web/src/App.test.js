import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders body container', () => {
  const { container } = render(<App />);
  const body = container.querySelector('.app > .body');
  expect(body).toBeInTheDocument();
});