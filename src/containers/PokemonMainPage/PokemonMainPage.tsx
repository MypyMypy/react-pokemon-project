import { useState } from 'react';
import { usePokemonContext } from '../../context/Pokemon-context/pokemon-context';
import './pokemonMainPage.css';

import Pokemons from '../../components/Pokemons/Pokemons';
import Spinner from '../../components/UI/Spinner/Spinner';

interface PokemonMainPageProps {
  showDetails?: boolean;
}

const PokemonMainPage: React.FC<PokemonMainPageProps> = (props) => {
  const pokemonContext = usePokemonContext();
  const { searchingPokemons, loading } = pokemonContext;
  const [countPokemons, setPokemonsCount] = useState(6);
  const showingPokemons = searchingPokemons.slice(0, countPokemons);

  const increasePokemonsHandler = () => {
    const updatedCount = countPokemons;
    setPokemonsCount(updatedCount + 6);
  };

  const renderMainPage = () => {
    if (loading) {
      return <Spinner />;
    }

    if (searchingPokemons.length) {
      const pokemonsMoreButton =
        searchingPokemons.length !== showingPokemons.length ? (
          <button
            className="pokemons__button-more"
            onClick={() => increasePokemonsHandler()}
          >
            Show more Pokemons
          </button>
        ) : null;

      return (
        <div>
          <h1>Choose your Pokemon!</h1>
          <Pokemons pokemons={showingPokemons} />
          {pokemonsMoreButton}
        </div>
      );
    }

    return <h1>All the Pokemon hid!</h1>;
  };

  return (
    <section className="pokemons">
      {!props.showDetails && renderMainPage()}
    </section>
  );
};

export default PokemonMainPage;
