import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { WrappedApp } from '../App';

describe('PokemonMainPage', () => {
  it('Renders Main Page with 6 cards', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Choose your Pokemon!'
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6);
  });
  it('Renders Main Page more cards', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const moreButton = screen.getByText('Show more Pokemons');

    await waitFor(() => {
      fireEvent.click(moreButton);
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Choose your Pokemon!'
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(12);
  });
  it('Unrenders More Button', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    let moreButton: HTMLElement | null = screen.getByText('Show more Pokemons');

    while (moreButton) {
      fireEvent.click(screen.getByText('Show more Pokemons'));
      moreButton = screen.queryByText('Show more Pokemons');
    }

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Choose your Pokemon!'
    );
    expect(
      screen.getAllByRole('heading', { level: 3 }).length
    ).toBeGreaterThanOrEqual(6);
    expect(moreButton).toBeNull();
  });
  it('Renders Side Pokemon Page', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const pokemonCards = screen.getAllByRole('heading', { level: 3 });

    fireEvent.click(pokemonCards[0]);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const headings = screen.getAllByRole('heading', { level: 1 });

    expect(headings[0]).toHaveTextContent('Choose your Pokemon!');
    expect(headings[1]).toHaveTextContent('You have found the Pokemon!');
    expect(window.location.pathname).toBe('/pokemon/1');
  });
  it('Renders Pokemon Page Details', async () => {
    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const detailsLink = screen.getByText('Want to know more?');

    fireEvent.click(detailsLink);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const urlSearchParams = new URLSearchParams(window.location.search);
    expect(urlSearchParams.get('details')).toBe('1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'You have found the Pokemon! It is'
    );
    expect(urlSearchParams.get('details')).toBe('1');
  });
});
