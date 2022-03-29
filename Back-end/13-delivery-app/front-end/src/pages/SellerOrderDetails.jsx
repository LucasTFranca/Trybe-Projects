import React, { useContext, useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import SellerHeader from '../components/SellerHeader';
import SellerDetailsProductOrderList
  from '../components/SellerDetailsProductOrderList';
import { requestOrderById } from '../helpers';
import CustomerContext from '../context/customer/CustomerContext';
import ProductContext from '../context/product/ProductContext';

function SellerOrderDetails({ history, location, match }) {
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
    async function updateSellerOrderDetails() {
      const data = await requestOrderById(match.params.id, user.token);

      setOrder(data);
    }

    updateSellerOrderDetails();
  }, [match.params.id, user.token]);

  async function updateStatusOrderToDelivered() {
    await updateOrderStatus(match.params.id, 'Em Trânsito');
  }

  async function updateStatusOrderToPreparing() {
    await updateOrderStatus(match.params.id, 'Preparando');
  }

  if (!order) return <h1>Loading...</h1>;

  return (
    <div>
      <SellerHeader history={ history } location={ location } />
      <h1>Detalhe do Pedido</h1>
      <span
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        { `PEDIDO ${order.id};` }
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { dateFormat(order.saleDate, 'dd/mm/yyyy') }
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { order.status }
      </span>
      <button
        type="button"
        disabled={ order.status.toLowerCase() !== 'pendente' }
        onClick={ updateStatusOrderToPreparing }
        data-testid="seller_order_details__button-preparing-check"
      >
        PREPARANDO PEDIDO
      </button>
      <button
        type="button"
        disabled={ order.status.toLowerCase() !== 'preparando' }
        onClick={ updateStatusOrderToDelivered }
        data-testid="seller_order_details__button-dispatch-check"
      >
        SAIU PARA ENTREGA
      </button>
      <div>
        <span>Item</span>
        <span>Descrição</span>
        <span>Quantidade</span>
        <span>Valor Unitário</span>
        <span>Sub-total</span>
        <span>Remover Item</span>

        <SellerDetailsProductOrderList products={ order.products } />

        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: R$ ${String(order.totalPrice).replace('.', ',')}` }
        </span>
      </div>
    </div>
  );
}

SellerOrderDetails.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}.isRequired;

export default SellerOrderDetails;
