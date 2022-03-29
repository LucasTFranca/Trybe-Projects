import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../context/customer/CustomerContext';
import ProductContext from '../context/product/ProductContext';
import { requestToRegisterNewOrder } from '../helpers';

function AddressDetails({ history }) {
  const { sellers, productsCartList, totalPrice } = useContext(ProductContext);
  const { user } = useContext(CustomerContext);

  const [selectSellerValue, setSelectSellerValue] = useState(sellers[0].id);
  const [addressNumberValue, setAddressNumberValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [notShowOverlay, setNotShowOverlay] = useState(true);

  async function createOrder() {
    const { id: sellerId } = sellers.find(
      ({ id }) => id === selectSellerValue,
    );

    const products = [];
    productsCartList.forEach(({ id: productId, quantity }) => {
      products.push({ productId, quantity });
    });

    const order = {
      products,
      totalPrice: Number(totalPrice),
      userId: user.id,
      sellerId,
      deliveryAddress: addressValue,
      deliveryNumber: Number(addressNumberValue),
    };

    setNotShowOverlay(false);

    const id = await requestToRegisterNewOrder(order, user.token);

    const transitionTime = 3000;
    setTimeout(() => {
      setNotShowOverlay(true);
      history.push(`/customer/orders/${id}`);
    }, transitionTime);
  }

  return (
    <>
      {notShowOverlay || (
        <div
          style={ {
            height: '100%',
            width: '100%',
            position: 'absolute',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '0px',
          } }
        >
          <span>Compra realizada com sucesso!</span>
        </div>
      )}
      <div>
        <span>Detalhes e Endereço para Entrega</span>
        <label htmlFor="customer_checkout__select-seller">
          P.Vendedora Responsável
          <select
            value={ selectSellerValue }
            id="customer_checkout__select-seller"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => setSelectSellerValue(Number(target.value)) }
          >
            {sellers.map(({ name, id }) => (
              <option key={ name } value={ id }>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="customer_checkout__input-address">
          Endereço
          <input
            value={ addressValue }
            id="customer_checkout__input-address"
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setAddressValue(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="customer_checkout__input-addressNumber">
          Número
          <input
            value={ addressNumberValue }
            type="number"
            id="customer_checkout__input-addressNumber"
            data-testid="customer_checkout__input-addressNumber"
            onChange={ ({ target }) => setAddressNumberValue(target.value) }
          />
        </label>
        <button
          type="button"
          disabled={ !(addressNumberValue.length && addressValue.length) }
          onClick={ createOrder }
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </>
  );
}

AddressDetails.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default AddressDetails;
