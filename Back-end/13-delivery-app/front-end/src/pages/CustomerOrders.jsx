import React, { useContext, useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import CustomerContext from '../context/customer/CustomerContext';
import { getAllOrders } from '../helpers';
import Header from '../components/Header';
import ProductContext from '../context/product/ProductContext';

function CustomerOrders({ history, location }) {
  const [orders, setOrders] = useState();

  const { user } = useContext(CustomerContext);
  const { socketStatusOrder } = useContext(ProductContext);

  useEffect(() => {
    if (!socketStatusOrder) return null;

    function updateOrder() {
      setOrders((prevOrders) => {
        const ordersWithoutOrderFound = prevOrders
          .filter(({ id }) => id !== socketStatusOrder.id);

        const orderFound = prevOrders.find(({ id }) => id === socketStatusOrder.id);

        return [
          ...ordersWithoutOrderFound,
          { ...orderFound, status: socketStatusOrder.status },
        ];
      });
    }

    updateOrder();
  }, [socketStatusOrder]);

  useEffect(() => {
    async function updateOrders() {
      const data = await getAllOrders(user.id, user.token);

      setOrders(data);
    }

    updateOrders();
  }, [user]);

  function redirectToOrderDetails({ target }) {
    const { id } = target.parentNode;
    return history.push(`/customer/orders/${id}`);
  }

  if (!orders) return <h1>Loading...</h1>;

  return (
    <>
      <Header history={ history } location={ location } />

      {orders.map(({ id, status, saleDate, totalPrice }) => (
        <button type="button" id={ id } key={ id } onClick={ redirectToOrderDetails }>
          <span
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { `Pedido ${id}` }

          </span>
          <span
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            { status }

          </span>
          <span
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            { dateFormat(saleDate, 'dd/mm/yyyy') }

          </span>
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            { String(totalPrice).replace('.', ',') }
          </span>
        </button>
      ))}
    </>
  );
}

CustomerOrders.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default CustomerOrders;
