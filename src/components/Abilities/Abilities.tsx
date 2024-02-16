import './ability.css';

interface AbilitiesProps {
  abilities: string[];
}

const Abilities: React.FC<AbilitiesProps> = (props) => {
  let abilities = <h3>Too shy to show abilities!</h3>;

  if (props.abilities.length) {
    abilities = (
      <ul>
        {props.abilities.map((location, index) => (
          <li key={index} className="ability">
            {location.split('-').join(' ')}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Pokemon Abilities:</h2>
      {abilities}
    </div>
  );
};

export default Abilities;
