import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Table() {
  const { data, filteredPlanets } = useContext(StarWarsContext);

  if (!data || !filteredPlanets) return <h1>Loading</h1>;

  return (
    <table>
      <thead>
        <tr>
          { Object.keys(data[0]).map((name) => (<th key={ name }>{ name }</th>)) }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              { Object.values(planet).map((value) => <td key={ value }>{ value }</td>) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
