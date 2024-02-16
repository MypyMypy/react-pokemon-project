import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import { PokemonContextProvider } from './context/Pokemon-context/pokemon-context';
import './App.css';

import Layout from './hoc/Layout/Layout';
import PokemonMainPage from './containers/PokemonMainPage/PokemonMainPage';
import PokemonPage from './containers/PokemonPage/PokemonPage';

interface AppState {
  showDetails: boolean;
}

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const location = useLocation();

  const [state, setState] = useState<AppState>({
    showDetails: false,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const showDetails = searchParams.get('details') === '1';
    setState((prevState) => ({ ...prevState, showDetails }));
  }, [location.search]);

  return (
    <Layout showSearch={!state.showDetails}>
      <Routes>
        <Route
          path="*"
          element={<h1>There are no Pokemon here. Lets go to Main Page!</h1>}
        />
        <Route
          path="/"
          element={<PokemonMainPage showDetails={state.showDetails} />}
        />
        <Route
          path="/pokemon/:pokemonId"
          element={
            <div className="pokemon-container">
              {<PokemonMainPage showDetails={state.showDetails} />}
              <PokemonPage />
            </div>
          }
        />
      </Routes>
    </Layout>
  );
};

export function WrappedApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <PokemonContextProvider>
          <App />
        </PokemonContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
