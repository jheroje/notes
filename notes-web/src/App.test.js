import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders note', () => {
  const { container } = render(<App />);
  const noteElement = container.querySelector("p.note");
  expect(noteElement).toBeInTheDocument();
});
