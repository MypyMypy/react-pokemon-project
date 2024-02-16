import Search from '../Search/Search';

interface ToolbarProps {
  showSearch?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  if (props.showSearch) {
    return (
      <header data-testid="toolbar">
        <Search />
      </header>
    );
  }
};

export default Toolbar;
