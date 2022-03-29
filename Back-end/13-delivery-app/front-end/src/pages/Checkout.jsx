import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CheckoutOrderList from '../components/CheckoutOrderList';
import ProductContext from '../context/product/ProductContext';
import AddressDetails from '../components/AddressDetails';

function Checkout({ history, location }) {
  const { totalPrice } = useContext(ProductContext);

  return (
    <>
      <Header history={ history } location={ location } />
      <h1>Finalizar Pedido</h1>
      <div>
        <span>Item</span>
        <span>Descrição</span>
        <span>Quantidade</span>
        <span>Valor Unitário</span>
        <span>Sub-total</span>
        <span>Remover Item</span>

        <CheckoutOrderList />

        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${String(totalPrice).replace('.', ',')}`}
        </span>
      </div>
      <AddressDetails history={ history } />
    </>
  );
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default Checkout;
