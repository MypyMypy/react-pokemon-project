import { useEffect, useState } from 'react';
import './searchRequests.css';

import SearchRequest from './SearchRequest/SearchRequest';

interface SearchRequestsState {
  searchRequests: string[];
}

interface SearchRequestsProps {
  show: boolean;
  clicked: (event: React.MouseEvent<HTMLButtonElement>, value: string) => void;
  className?: string;
}

const SearchRequests: React.FC<SearchRequestsProps> = (props) => {
  const [state, setState] = useState<SearchRequestsState>({
    searchRequests: [],
  });

  const storedSearchValues = localStorage.getItem('searchValues');

  useEffect(() => {
    if (storedSearchValues) {
      const parsedSearchValues = JSON.parse(storedSearchValues) as string[];
      setState({ searchRequests: parsedSearchValues });
    }
  }, [storedSearchValues]);

  let searchRequests = null;
  let searchRequestsClasses = '';

  if (state.searchRequests && props.show) {
    searchRequestsClasses = [props.className, 'search-requests'].join(' ');
    searchRequests = (
      <div className={searchRequestsClasses}>
        {state.searchRequests.map((item, index) => {
          return (
            <SearchRequest
              key={index}
              clicked={(event: React.MouseEvent<HTMLButtonElement>) =>
                props.clicked(event, item)
              }
            >
              {item}
            </SearchRequest>
          );
        })}
      </div>
    );

    return <>{searchRequests}</>;
  }
};

export default SearchRequests;
