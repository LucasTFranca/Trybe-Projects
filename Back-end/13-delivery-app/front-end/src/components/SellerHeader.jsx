import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../context/customer/CustomerContext';

function SellerHeader({ history, location }) {
  const { user } = useContext(CustomerContext);

  function validateRoteToDisableButton() {
    const regex = /^\/seller\/orders\/\d+$/g;
    const regexValidateResponse = regex.test(location.pathname);

    if (!regexValidateResponse) return true;
    return false;
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
        onClick={ () => history.push('/seller/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        PEDIDOS
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

SellerHeader.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default SellerHeader;
