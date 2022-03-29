import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ProductContext from '../context/product/ProductContext';
import ProductCard from '../components/ProductCard';

function Product({ history, location }) {
  const [unlockButton, setUnlockButton] = useState(true);

  const { products, totalPrice } = useContext(ProductContext);
  const { productsCartList } = useContext(ProductContext);

  useEffect(() => {
    if (productsCartList.length > 0) setUnlockButton(false);
    else setUnlockButton(true);
  }, [productsCartList]);

  function redirectToCheckout() {
    history.push('/customer/checkout');
  }

  return (
    <>
      <Header history={ history } location={ location } />
      {
        products.map(
          (product) => (
            <ProductCard key={ product.name } product={ product } />
          ),
        )
      }
      <div>
        <button
          type="button"
          disabled={ unlockButton }
          data-testid="customer_products__button-cart"
          onClick={ redirectToCheckout }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `Ver Carrinho: R$: ${String(totalPrice).replace('.', ',')}` }
          </span>
        </button>
      </div>
    </>
  );
}

Product.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}.isRequired;

export default Product;
