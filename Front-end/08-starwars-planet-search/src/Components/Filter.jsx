import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

const INITIAL_COLUMN_DROPDOWN = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
const comparisonDropdown = ['maior que', 'menor que', 'igual a'];
const sortDropdown = [
  'name',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: '',
};

function Filter() {
  const {
    filters,
    filters: { filterByName },
    setFilters,
  } = useContext(StarWarsContext);
  const [columnDropdown, setColumnDropdown] = useState(INITIAL_COLUMN_DROPDOWN);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [state, setState] = useState(INITIAL_STATE);
  const { column, comparison, value: inputValue } = state;

  function handleChange({ target }) {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  function stateUpdater({ target }) {
    const { id, value } = target;
    setState({
      ...state,
      [id]: value,
    });
  }

  function handleClick() {
    if (columnDropdown.length) {
      setFilters({
        ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues,
          {
            column,
            comparison,
            value: inputValue,
          },
        ],
      });

      const newColumn = [];

      columnDropdown.forEach((columnValue) => {
        if (columnValue === column) return;
        newColumn.push(columnValue);
      });

      setColumnDropdown(newColumn);

      setAppliedFilters([...appliedFilters, column]);

      setState({
        ...state,
        column: newColumn[0],
      });
    }
  }

  function removeClick({ target }) {
    const { id } = target;
    let newNumericValues = [];
    let newAppliedFilters = [];
    let newColumnDropdown = [];

    filters.filterByNumericValues.forEach((filter) => {
      if (filter.column === id) newColumnDropdown = [...columnDropdown, filter.column];
      else {
        newNumericValues = [...newNumericValues, filter];
        newAppliedFilters = [...newAppliedFilters, filter.column];
      }
    });

    setFilters({
      ...filters,
      filterByNumericValues: [...newNumericValues],
    });

    setAppliedFilters([...newAppliedFilters]);

    setColumnDropdown([...newColumnDropdown]);

    setState({
      ...state,
      column: newColumnDropdown[0],
    });
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filterByName.name }
        onChange={ handleChange }
        type="text"
      />

      <select
        id="column"
        value={ column }
        onChange={ stateUpdater }
        data-testid="column-filter"
      >
        { columnDropdown.map((option) => <option key={ option }>{ option }</option>) }
      </select>

      <select
        id="comparison"
        value={ comparison }
        onChange={ stateUpdater }
        data-testid="comparison-filter"
      >
        { comparisonDropdown.map((option) => <option key={ option }>{ option }</option>) }
      </select>

      <input
        id="value"
        value={ inputValue }
        onChange={ stateUpdater }
        data-testid="value-filter"
        type="number"
      />

      <button
        onClick={ handleClick }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>

      <select data-testid="column-sort">
        { sortDropdown.map((option) => <option key={ option }>{ option }</option>) }
      </select>

      <label htmlFor="sort-asc">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          id="sort-asc"
        />
        ASC
      </label>

      <label htmlFor="sort-desc">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          id="sort-desc"
        />
        DESC
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
      >
        Submit
      </button>

      {
        appliedFilters.map((appliedColumn) => (
          <label
            data-testid="filter"
            style={ { margin: '10px' } }
            key={ appliedColumn }
            htmlFor={ `${appliedColumn}` }
          >
            { appliedColumn }
            <button
              onClick={ removeClick }
              className="remove"
              id={ appliedColumn }
              type="button"
            >
              X
            </button>
          </label>
        ))
      }
    </div>
  );
}

export default Filter;
