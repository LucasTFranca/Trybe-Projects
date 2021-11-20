import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export default class Cart extends React.Component {
  render() {
    const { cartList, increseProduct, decreseProduct } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
        <div style={ { padding: '5px' } }>
          {
            Object.keys(cartList).map((id) => (
              <div key={ id } id={ id }>
                <h3 data-testid="shopping-cart-product-name">{ cartList[id].title }</h3>
                <button
                  onClick={ () => decreseProduct(id) }
                  data-testid="product-decrease-quantity"
                  type="button"
                  id="product-decrease-quantity"
                >
                  -
                </button>

                <span
                  data-testid="shopping-cart-product-quantity"
                  style={ { margin: '5px' } }
                >
                  { cartList[id].quantity }
                </span>

                <button
                  onClick={ () => increseProduct(id) }
                  data-testid="product-increase-quantity"
                  type="button"
                  id="product-increase-quantity"
                >
                  +
                </button>
              </div>
            ))
          }
        </div>
        <Link data-testid="checkout-products" to="/checkout" />
      </div>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.objectOf(PropTypes.string),
  increseProduct: PropTypes.func,
  decreseProduct: PropTypes.func,
}.isRequired;
