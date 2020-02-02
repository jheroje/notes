import React from 'react';
import { render, getByText } from '@testing-library/react';
import List from './List';
import Note from './Note';

test('renders notes', () => {
  const { container } = render(<List />);

  setTimeout(() => {
    const noteElement = container.querySelector("div.note");
    expect(noteElement).toBeInTheDocument();
  }, 1000)
  
});

test('renders note content', () => {
  const title = "test";
  const text = "testing text";

  const note = { title, text };
  const { container } = render(<Note note={note} />);

  const titleParagraph = getByText(container, title);
  const textParagraph = getByText(container, text);

  expect(titleParagraph).toBeInTheDocument();
  expect(textParagraph).toBeInTheDocument();
  
});

