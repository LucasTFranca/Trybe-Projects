import React from 'react';
import PropTypes from 'prop-types';

function CustomerDetailsProductOrderList({ products }) {
  return (
    <ul>
      {
        products.map(({ name, price, quantityTotal: { quantity } }, index) => (
          <li key={ name }>
            <span
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </span>
            <span
              data-testid={
                `customer_order_details__element-order-table-name-${index}`
              }
            >
              { name }
            </span>
            <span
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              { String(quantity).replace('.', '.') }
            </span>
            <span
              data-testid={
                `customer_order_details__element-order-total-price-${index}`
              }
            >
              { String(price).replace('.', ',') }
            </span>
            <span
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              { String((quantity * Number(price)).toFixed(2)).replace('.', ',') }
            </span>
          </li>
        ))
      }
    </ul>
  );
}

CustomerDetailsProductOrderList.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default CustomerDetailsProductOrderList;
