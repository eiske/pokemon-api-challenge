import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardGeneration from '../components/CardGeneration';
import Pokemon from '../components/Pokemon';

test('shold add game generations name in document', () => {
  const { getByLabelText } = render(<CardGeneration />);

  const generationElement = getByLabelText('generation-card');
  expect(generationElement).toBeInTheDocument();
});

test('shold render pokemon modal in document', () => {
  const { getByLabelText } = render(<Pokemon />);

  const generationElement = getByLabelText('pokemon');
  expect(generationElement).toBeInTheDocument();
});
