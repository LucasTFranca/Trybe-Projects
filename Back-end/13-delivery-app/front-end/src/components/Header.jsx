import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../context/customer/CustomerContext';

function Header({ history, location }) {
  const { user } = useContext(CustomerContext);

  function validateRoteToDisableButton() {
    if (location.pathname !== '/customer/products') return false;
    return true;
  }

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div id="headerContainer">
      <button
        type="button"
        disabled={ validateRoteToDisableButton() }
        onClick={ () => history.push('/customer/products') }
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        type="button"
        onClick={ () => history.push('/customer/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user.name }
      </div>
      <button
        type="button"
        onClick={ logout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default Header;
