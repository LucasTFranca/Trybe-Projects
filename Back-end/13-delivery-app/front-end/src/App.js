import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';
import Product from './pages/Product';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Product } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route path="/admin/manage" component={ Admin } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
