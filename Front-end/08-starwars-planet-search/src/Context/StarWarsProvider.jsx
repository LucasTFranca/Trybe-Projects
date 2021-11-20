import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const INITIAL_STATE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [filters, setFilters] = useState(INITIAL_STATE);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    async function planetsRequest() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      data.results.forEach((planet) => {
        delete planet.residents;
      });

      setPlanets(data.results);
      setFilteredPlanets(data.results);
    }

    planetsRequest();
  }, []);

  useEffect(() => {
    if (planets) {
      let filterArray = planets
        .filter(({ name }) => name.includes(filters.filterByName.name));

      filters.filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          filterArray = filterArray
            .filter((planet) => Number(planet[column]) > Number(value));
          break;
        case 'menor que':
          filterArray = filterArray
            .filter((planet) => Number(planet[column]) < Number(value));
          break;
        default:
          filterArray = filterArray
            .filter((planet) => Number(planet[column]) === Number(value));
        }
      });

      setFilteredPlanets(filterArray);
    }
  }, [filters, planets]);

  const state = {
    data: planets,
    filteredPlanets,
    filters,
    setFilters,
  };

  return (
    <StarWarsContext.Provider value={ state }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default StarWarsProvider;
