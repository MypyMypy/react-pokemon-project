import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { WrappedApp } from '../App';

describe('ToolBar', () => {
  it('Renders ToolBar', () => {
    render(<WrappedApp />);
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });
  it('Unrenders ToolBar', async () => {
    render(<WrappedApp />);
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const Toolbar = screen.getByTestId('toolbar');
    expect(Toolbar).toBeInTheDocument();

    const firstPokemonCard = screen.getAllByRole('heading', { level: 3 })[0];
    fireEvent.click(firstPokemonCard);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
    expect(window.location.pathname).toBe('/pokemon/1');

    const detailsLink = screen.getByText('Want to know more?');
    fireEvent.click(detailsLink);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'You have found the Pokemon! It is'
    );
    expect(Toolbar).not.toBeInTheDocument();
  });
});
