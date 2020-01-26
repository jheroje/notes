import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders visits', () => {
  const { container } = render(<App />);
  const visitsElement = container.querySelector("p.visits");
  expect(visitsElement).toBeInTheDocument();
});
