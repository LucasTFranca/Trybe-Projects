import React from 'react';
import PropTypes from 'prop-types';
import Avaliation from '../Components/FormAvaliation';

export default class Product extends React.Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(product) {
    const { cartStateUpadte } = this.props;
    product.quantity = 1;
    cartStateUpadte(product);
  }

  render() {
    const { products, match: { params: { id: idParam } } } = this.props;
    const findedProduct = products.find(({ id: idProduct }) => idProduct === idParam);
    const { id, title, thumbnail, price } = findedProduct;
    return (
      <div data-testid="product" key={ id }>
        <div>
          <h2 data-testid="product-detail-name">{ title }</h2>
        </div>
        <img src={ thumbnail } alt={ title } />
        <h2>{`R$ ${price}`}</h2>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          id={ id }
          onClick={ () => this.addToCart({ id, title, thumbnail, price }) }
        >
          Adicionar ao carrinho
        </button>
        <Avaliation />
      </div>
    );
  }
}

Product.propTypes = {
  products: PropTypes.objectOf(PropTypes.string),
  cartStateUpadte: PropTypes.func,
}.isRequired;
