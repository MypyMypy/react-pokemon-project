import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './pokemon-page.css';
import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import Locations from '../../components/Locations/Locations';
import Abilities from '../../components/Abilities/Abilities';

interface PokemonPageState {
  name: string;
  abilities: string[];
  loading: boolean;
  locations: string[];
  details: boolean;
}

const PokemonPage: React.FC = () => {
  const location = useLocation();

  const [state, setState] = useState<PokemonPageState>({
    name: '',
    abilities: [],
    locations: [],
    loading: false,
    details: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    axios.get(location.pathname).then((res) => {
      const abilities: string[] = res.data.abilities.map(
        (ability: { ability: { name: string } }) => ability.ability.name
      );

      setState((prevState) => ({
        ...prevState,
        name: res.data.name,
        abilities: abilities,
      }));
    });
    axios.get(location.pathname + '/encounters').then((res) => {
      const locations: string[] = res.data.map(
        (location: { location_area: { name: string } }) =>
          location.location_area.name
      );
      setState((prevState) => ({
        ...prevState,
        locations: locations,
      }));
    });

    setState((prevState) => ({ ...prevState, loading: false }));
  }, [location.pathname]);

  let pokemonPage = <Spinner />;
  let backLink = null;
  let pokemonDetails = (
    <Link to={{ pathname: location.pathname, search: 'details=1' }}>
      Want to know more?
    </Link>
  );

  const searchParams = new URLSearchParams(location.search);
  const showDetails = searchParams.get('details') === '1';

  if (showDetails) {
    backLink = <Link to="/">Back to other Pokemons</Link>;
    pokemonDetails = <Abilities abilities={state.abilities} />;
  }

  if (state.name && !state.loading) {
    pokemonPage = (
      <>
        {backLink}
        <h1>
          You have found the Pokemon! It is{' '}
          <strong className="pokemon-page__pokemon-name">{state.name}</strong>
        </h1>
        {<Locations locations={state.locations} />}
        {pokemonDetails}
      </>
    );
  }

  return <section className="pokemon-page">{pokemonPage}</section>;
};

export default PokemonPage;
