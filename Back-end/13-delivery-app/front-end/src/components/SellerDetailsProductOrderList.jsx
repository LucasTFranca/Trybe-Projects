import React from 'react';
import PropTypes from 'prop-types';

function SellerDetailsProductOrderList({ products }) {
  return (
    <ul>
      {
        products.map(({ name, price, quantityTotal: { quantity } }, index) => (
          <li key={ name }>
            <span
              data-testid={
                `seller_order_details__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </span>
            <span
              data-testid={
                `seller_order_details__element-order-table-name-${index}`
              }
            >
              { name }
            </span>
            <span
              data-testid={
                `seller_order_details__element-order-table-quantity-${index}`
              }
            >
              { (quantity) }
            </span>
            <span
              data-testid={
                `seller_order_details__element-order-table-unit-price-${index}`
              }
            >
              { String(price).replace('.', ',') }
            </span>
            <span
              data-testid={
                `seller_order_details__element-order-table-sub-total-${index}`
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

SellerDetailsProductOrderList.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default SellerDetailsProductOrderList;
