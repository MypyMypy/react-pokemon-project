import React, { useContext, useState, useEffect } from 'react';
import axios from '../../axios-orders';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextState {
  pokemons: Array<Pokemon>;
  searchingPokemons: Array<Pokemon>;
  loading: boolean;
  searched: boolean;
  error: boolean;
}

interface PokemonContextType extends PokemonContextState {
  searchPokemon: (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
}

const initialState: PokemonContextState = {
  pokemons: [],
  searchingPokemons: [],
  loading: false,
  searched: false,
  error: false,
};

const PokemonContext = React.createContext<PokemonContextType | null>(null);

const usePokemonContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

const updateLocalStorage = (
  value: string,
  storedSearchValues: string[]
): void => {
  const index = storedSearchValues.indexOf(value);

  if (index !== -1) {
    storedSearchValues.splice(index, 1);
  }

  storedSearchValues.unshift(value);
  const latestSearchValues = storedSearchValues.slice(0, 5);

  localStorage.setItem('searchValues', JSON.stringify(latestSearchValues));
};

const PokemonContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    axios
      .get('/pokemon/')
      .then((res) => {
        const pokemons: Array<Pokemon> = res.data.results;
        setState((prevState) => ({
          ...prevState,
          pokemons: pokemons,
          searchingPokemons: pokemons,
          loading: false,
        }));
      })
      .catch((error) => {
        console.log('Error fetching Pokemon:', error);
        setState((prevState) => ({
          ...prevState,
          error: !!error,
          loading: false,
        }));
      });
  }, []);

  const searchPokemonsHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ): void => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true }));

    if (value === '' && state.searched) {
      setState((prevState) => ({
        ...prevState,
        searchingPokemons: state.pokemons,
        searched: false,
        loading: false,
      }));
    }
    if (value !== '') {
      const searchPokemons = state.pokemons.filter((pokemon: Pokemon) =>
        pokemon.name.includes(value.toLowerCase().trim())
      );

      const storedSearchValues: string[] = JSON.parse(
        localStorage.getItem('searchValues') || '[]'
      );

      updateLocalStorage(value, storedSearchValues);

      setState((prevState) => ({
        ...prevState,
        searchingPokemons: searchPokemons,
        searched: true,
        loading: false,
      }));
    }
    setState((prevState) => ({ ...prevState, loading: false }));
  };

  const contextValue: PokemonContextType = {
    ...state,
    searchPokemon: searchPokemonsHandler,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContextProvider, usePokemonContext };
