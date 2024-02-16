import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { PokemonContextProvider } from '../context/Pokemon-context/pokemon-context';
import { WrappedApp } from '../App';
import Search from '../components/Search/Search';

describe('Search', () => {
  it('Renders SearchBar', () => {
    render(
      <PokemonContextProvider>
        <Search />
      </PokemonContextProvider>
    );
    expect(screen.getByTestId('search')).toBeVisible();
  });
  it('Handles button click and interacts with localStorage', async () => {
    const mockLocalStorageData = ['kiki', 'dadi', 'baku', 'pikaa', 'asdaas'];

    localStorage.setItem('searchValues', JSON.stringify(mockLocalStorageData));

    render(<WrappedApp />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const searchInput = screen.getByPlaceholderText('Search Pokemon');
    const searchButton = screen.getByText('Search');
    let initLocalStorage: string | string[] | null =
      localStorage.getItem('searchValues');
    const inputTestValue = 'pica';

    fireEvent.change(searchInput, {
      target: { value: inputTestValue },
    });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    let currentLocalStorage: string | string[] | null =
      localStorage.getItem('searchValues');

    if (currentLocalStorage) {
      currentLocalStorage = JSON.parse(currentLocalStorage);
    } else {
      currentLocalStorage = [];
    }
    if (initLocalStorage) {
      initLocalStorage = JSON.parse(initLocalStorage);
    } else {
      initLocalStorage = [];
    }

    expect(initLocalStorage?.length).toBeGreaterThan(0);
    expect(currentLocalStorage).not.toEqual(initLocalStorage);
    if (currentLocalStorage?.length === 5) {
      expect(currentLocalStorage.length).toEqual(5);
      expect(currentLocalStorage[0]).toEqual(inputTestValue);
    }
  });
});
