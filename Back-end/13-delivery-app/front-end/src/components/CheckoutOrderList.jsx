import React, { useContext } from 'react';
import ProductContext from '../context/product/ProductContext';

function CheckoutOrderList() {
  const { productsCartList, setProductsCartList } = useContext(ProductContext);

  function deleteItemOfProductsCartList({ target }) {
    const { id } = target.parentNode;
    const updatedProductsCartList = productsCartList.filter(
      ({ id: productId }) => productId !== Number(id),
    );

    setProductsCartList(updatedProductsCartList);
  }

  return (
    <ul>
      {
        productsCartList.map(({ id, name, price, quantity }, index) => (
          <li id={ id } key={ name }>
            <span
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </span>
            <span
              data-testid={
                `customer_checkout__element-order-table-name-${index}`
              }
            >
              { name }
            </span>
            <span
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              { String(quantity).replace('.', ',') }
            </span>
            <span
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
            >
              { String(price).replace('.', ',') }
            </span>
            <span
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              { String((quantity * Number(price)).toFixed(2)).replace('.', ',') }
            </span>
            <button
              type="button"
              onClick={ deleteItemOfProductsCartList }
              data-testid={
                `customer_checkout__element-order-table-remove-${index}`
              }
            >
              Remover
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default CheckoutOrderList;
