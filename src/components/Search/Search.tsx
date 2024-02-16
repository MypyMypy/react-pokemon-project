import { useState } from 'react';
import './search.css';
import { usePokemonContext } from '../../context/Pokemon-context/pokemon-context';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import SearchRequests from './SearchRequests/SearchRequests';

interface SearchState {
  inputValue: string;
  showSearchRequests: boolean;
}

const Search: React.FC = () => {
  const pokemonContext = usePokemonContext();

  const [state, setState] = useState<SearchState>({
    inputValue: '',
    showSearchRequests: false,
  });

  const inputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const updatedInputValue = event.target.value;
    setState((prevState) => ({ ...prevState, inputValue: updatedInputValue }));
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      (!target.closest('.search__search-requests') &&
        !target.closest('.search__input')) ||
      target.closest('.search-requests__button')
    ) {
      setState((prevState) => ({ ...prevState, showSearchRequests: false }));
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  const inputFocusHandler = (): void => {
    document.addEventListener('click', handleDocumentClick);
    setState((prevState) => ({ ...prevState, showSearchRequests: true }));
  };

  return (
    <div className="search" data-testid="search">
      <Input
        className="search__input"
        elementType="input"
        label=""
        placeholder="Search Pokemon"
        value={state.inputValue}
        changed={inputChangedHandler}
        focused={inputFocusHandler}
      />
      <SearchRequests
        className="search__search-requests"
        show={state.showSearchRequests}
        clicked={pokemonContext.searchPokemon}
      />
      <Button
        className="search__button"
        clicked={(event: React.MouseEvent<HTMLButtonElement>) =>
          pokemonContext.searchPokemon(event, state.inputValue)
        }
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
