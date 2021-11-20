import React from 'react';
import './App.css';
import StarWarsProvider from './Context/StarWarsProvider';
import Table from './Components/Table';
import Filter from './Components/Filter';

function App() {
  return (
    <StarWarsProvider>
      <Filter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
