import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { App, WrappedApp } from '../App';
import { MemoryRouter } from 'react-router-dom';
import { PokemonContextProvider } from '../context/Pokemon-context/pokemon-context';

describe('App', () => {
  it('Renders Not Found Page', () => {
    render(
      <MemoryRouter initialEntries={['/_notfound']}>
        <PokemonContextProvider>
          <App />
        </PokemonContextProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'There are no Pokemon here. Lets go to Main Page!'
    );
  });
  it('Renders Loading', async () => {
    // ARRANGE
    render(<WrappedApp />);
    // ACT
    // EXPECT
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeVisible();
    });
  });
  it('Renders Choose your Pokemon! heading', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Choose your Pokemon!'
    );
  });
  it('Renders both headings on the Pokemon Page! heading', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/1']}>
        <PokemonContextProvider>
          <App />
        </PokemonContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const headings = screen.getAllByRole('heading', { level: 1 });

    expect(headings[0]).toHaveTextContent('Choose your Pokemon!');
    expect(headings[1]).toHaveTextContent('You have found the Pokemon!');
  });
  it('Renders Pokemon Details', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/1?details=1']}>
        <PokemonContextProvider>
          <App />
        </PokemonContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toEqual(1);
    expect(headings[0]).toHaveTextContent('You have found the Pokemon!');
  });
});
