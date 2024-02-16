import React from 'react';
import './pokemons.css';

import Pokemon from './Pokemon/Pokemon';

interface PokemonsProps {
  pokemons: Array<{ name: string; url: string }>;
  className?: string;
}

const Pokemons: React.FC<PokemonsProps> = (props) => {
  const pokemons = props.pokemons.map((pokemon, id) => {
    return (
      <Pokemon
        key={id}
        name={pokemon.name}
        url={pokemon.url}
        className="pokemons__pokemon"
      />
    );
  });

  return (
    <div>
      <h2>Pokemons</h2>
      <div className="pokemons__container">{pokemons}</div>
    </div>
  );
};

export default Pokemons;
