import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../context/product/ProductContext';

function ProductCard({ product }) {
  const [productQuantityValue, setProductQuantityValue] = useState(0);

  const { productsCartList, setProductsCartList } = useContext(ProductContext);

  function updateProductInCartList(currentValue) {
    const productsCartListWithoutCurrentProduct = productsCartList.filter(
      ({ id }) => id !== product.id,
    );

    setProductsCartList([
      ...productsCartListWithoutCurrentProduct,
      { ...product, quantity: currentValue },
    ]);
  }

  function handleChange(typeButton, event) {
    const buttonDictionary = {
      addition: () => {
        const currentValue = productQuantityValue + 1;

        updateProductInCartList(currentValue);
        setProductQuantityValue(currentValue);
      },
      subtract: () => {
        const currentValue = productQuantityValue - 1;

        if (productQuantityValue > 0) {
          if (currentValue === 0) {
            const productsCartListWithoutCurrentProduct = productsCartList.filter(
              ({ id }) => id !== product.id,
            );

            setProductsCartList(productsCartListWithoutCurrentProduct);
          } else updateProductInCartList(currentValue);

          setProductQuantityValue(currentValue);
        }
      },
      input: () => {
        const currentValue = Number(event.target.value);

        if (productQuantityValue > currentValue) {
          updateProductInCartList(currentValue);
          setProductQuantityValue(currentValue);
        }

        if (productQuantityValue < currentValue) {
          updateProductInCartList(currentValue);
          setProductQuantityValue(currentValue);
        }

        if (currentValue === 0) {
          const productsCartListWithoutCurrentProduct = productsCartList.filter(
            ({ id }) => id !== product.id,
          );

          setProductsCartList(productsCartListWithoutCurrentProduct);
          setProductQuantityValue(currentValue);
        }
      },
    };

    buttonDictionary[typeButton]();
  }

  return (
    <div>
      <span
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        { String(product.price).replace('.', ',') }
      </span>
      <img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.urlImage }
        alt={ `iamgem ${product.name}` }
      />
      <span
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        { product.name }
      </span>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        onClick={ () => handleChange('subtract') }
      >
        -
      </button>
      <input
        type="number"
        value={ productQuantityValue }
        min="0"
        onChange={ (event) => handleChange('input', event) }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        onClick={ () => handleChange('addition') }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
}.isRequired;

export default ProductCard;
