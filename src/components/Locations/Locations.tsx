import './locations.css';

interface LocationsProps {
  locations: string[];
}

const Locations: React.FC<LocationsProps> = (props) => {
  let locations = <h3>Too hard to find!</h3>;

  if (props.locations.length) {
    locations = (
      <ul>
        {props.locations.map((location, index) => (
          <li key={index} className="location">
            {location.split('-').join(' ')}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Pokemon Locations:</h2>
      {locations}
    </div>
  );
};

export default Locations;
