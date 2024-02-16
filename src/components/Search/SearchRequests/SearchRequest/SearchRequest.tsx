import { ReactNode } from 'react';

import Button from '../../../UI/Button/Button';

interface SearchRequestProps {
  clicked: (event: React.MouseEvent<HTMLButtonElement>, value: string) => void;
  children: ReactNode;
}

const SearchRequest: React.FC<SearchRequestProps> = (props) => {
  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    props.clicked(event, '');
  };

  return (
    <Button className="search-requests__button" clicked={onClickHandler}>
      {props.children}
    </Button>
  );
};

export default SearchRequest;
