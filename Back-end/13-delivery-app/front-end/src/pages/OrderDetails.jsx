import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import Header from '../components/Header';
import CustomerDetailsProductOrderList
  from '../components/CustomerDetailsProductOrderList';
import { requestOrderById } from '../helpers';
import CustomerContext from '../context/customer/CustomerContext';
import ProductContext from '../context/product/ProductContext';

function OrderDetails({ history, location, match }) {
  const [order, setOrder] = useState();

  const { user } = useContext(CustomerContext);
  const { socketStatusOrder, updateOrderStatus } = useContext(ProductContext);

  const orderId = order ? order.id : null;

  useEffect(() => {
    if (!orderId || !socketStatusOrder) return null;

    function updateOrder() {
      if (orderId === socketStatusOrder.id) {
        setOrder((prevOrder) => ({ ...prevOrder, status: socketStatusOrder.status }));
      }
    }

    updateOrder();
  }, [orderId, socketStatusOrder]);

  useEffect(() => {
    async function updateOrderDetails() {
      const data = await requestOrderById(match.params.id, user.token);

      setOrder(data);
    }

    updateOrderDetails();
  }, [match.params.id, user.token]);

  async function updateStatusOrderToDelivered() {
    await updateOrderStatus(match.params.id, 'Entregue');
  }

  if (!order) return <h1>Loading...</h1>;

  return (
    <div>
      <Header history={ history } location={ location } />
      <h1>Detalhe do Pedido</h1>
      <span
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        { `PEDIDO ${order.id};` }
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        { `P.Vend: ${order.seller.name}` }
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { dateFormat(order.saleDate, 'dd/mm/yyyy') }
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { order.status }
      </span>
      <button
        type="button"
        onClick={ updateStatusOrderToDelivered }
        disabled={ order.status.toLowerCase() !== 'em trânsito' }
        data-testid="customer_order_details__button-delivery-check"
      >
        MARCAR COMO ENTREGE
      </button>
      <div>
        <span>Item</span>
        <span>Descrição</span>
        <span>Quantidade</span>
        <span>Valor Unitário</span>
        <span>Sub-total</span>
        <span>Remover Item</span>

        <CustomerDetailsProductOrderList products={ order.products } />

        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          { `Total: R$ ${String(order.totalPrice).replace('.', ',')}` }
        </span>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}.isRequired;

export default OrderDetails;
