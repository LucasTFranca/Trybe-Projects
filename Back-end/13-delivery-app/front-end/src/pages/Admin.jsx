import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import NewUserRegistrationForm from '../components/NewUserRegistrationForm';
import OrderingSession from '../components/OrderingSession';

function Admin({ history, location }) {
  return (
    <div>
      <Header history={ history } location={ location } />
      <div>
        <NewUserRegistrationForm />
        <OrderingSession />
      </div>
    </div>
  );
}

Admin.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default Admin;
