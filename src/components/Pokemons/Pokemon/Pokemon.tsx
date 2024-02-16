import { useNavigate } from 'react-router-dom';

import './pokemon.css';

interface PokemonProps {
  name: string;
  url: string;
  className?: string;
}

const Pokemon: React.FC<PokemonProps> = (props) => {
  const navigate = useNavigate();

  const pokemonUrlParts = props.url.split('/');
  const pokemonId = pokemonUrlParts[pokemonUrlParts.length - 2];

  const pokemonClasses = [props.className, 'pokemon'].join(' ');

  const navigatePokemonHandle = (): void => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className={pokemonClasses} onClick={navigatePokemonHandle}>
      <h3 className="pokemon__name">{props.name}</h3>
    </div>
  );
};

export default Pokemon;
