import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';

function CustomerProvider({ children }) {
  const [user, setUser] = useState();

  const state = {
    user,
    setUser,
  };

  return (
    <CustomerContext.Provider value={ state }>
      { children }
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default CustomerProvider;
