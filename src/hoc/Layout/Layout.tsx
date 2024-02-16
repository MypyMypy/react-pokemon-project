import Toolbar from '../../components/Toolbar/Toolbar';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Toolbar showSearch={props.showSearch} />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
