import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import ProductContext from './ProductContext';
import { requestAllProducts, requestAllSellers } from '../../helpers';
import CustomerContext from '../customer/CustomerContext';

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsCartList, setProductsCartList] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [socketStatusOrder, setSocketStatusOrder] = useState();

  const { user } = useContext(CustomerContext);

  const socket = io('http://localhost:3001');

  useEffect(() => {
    socket.on('refreshStatus', (sentSocket) => {
      setSocketStatusOrder(sentSocket);
    });
  }, [socket]);

  useEffect(() => {
    const total = productsCartList.reduce((currentValue, nextValue) => (
      currentValue + (nextValue.quantity * Number(nextValue.price))
    ), 0);

    setTotalPrice(total.toFixed(2));
  }, [productsCartList]);

  useEffect(() => {
    async function productsRequisition() {
      const data = await requestAllProducts(user.token);

      setProducts(data);
    }
    async function sellersRequisition() {
      const data = await requestAllSellers();

      setSellers(data);
    }

    if (user) productsRequisition();
    sellersRequisition();
  }, [user]);

  function updateOrderStatus(id, status) {
    socket.emit('changeStatus', { id, status });
  }

  const state = {
    products,
    setProducts,
    productsCartList,
    setProductsCartList,
    sellers,
    setSellers,
    totalPrice,
    socketStatusOrder,
    updateOrderStatus,
  };

  return (
    <ProductContext.Provider value={ state }>
      { children }
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default ProductProvider;
