import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ProductList from './PageList/ProductList';
import Product from './PageList/Product';
import Cart from './PageList/Cart';
import Checkout from './Components/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.updateState = this.updateState.bind(this);
    this.cartStateUpadte = this.cartStateUpadte.bind(this);
    this.increseProduct = this.increseProduct.bind(this);
    this.decreseProduct = this.decreseProduct.bind(this);
    this.localUpdate = this.localUpdate.bind(this);

    this.state = {
      products: {},
      cartList: {},
      count: 0,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('count')) localStorage.count = 0;
    const count = JSON.parse(localStorage.count);
    this.localUpdate(count);
  }

  localUpdate(count) {
    this.setState({ count });
  }

  updateState(products) {
    this.setState({ products });
  }

  cartStateUpadte(product) {
    const { cartList } = this.state;
    if (cartList[product.id]) cartList[product.id].quantity += 1;
    else cartList[product.id] = product;
    const countReceived = JSON.parse(localStorage.count);
    const count = countReceived + 1;
    localStorage.count = JSON.stringify(count);
    this.setState({ count });
  }

  increseProduct(id) {
    const { cartList } = this.state;
    if (cartList[id].quantity < cartList[id].available) {
      cartList[id].quantity += 1;
      this.setState({ cartList });
      const countReceived = JSON.parse(localStorage.count);
      const count = countReceived + 1;
      localStorage.count = JSON.stringify(count);
      this.setState({ count });
    }
  }

  decreseProduct(id) {
    const { cartList } = this.state;
    if (cartList[id].quantity > 0) {
      cartList[id].quantity -= 1;
      this.setState({ cartList });
      const countReceived = JSON.parse(localStorage.count);
      const count = countReceived - 1;
      localStorage.count = JSON.stringify(count);
      this.setState({ count });
    }
  }

  render() {
    const { products, cartList, count } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Link to="/cart" data-testid="shopping-cart-button">
            <span role="img" aria-label="carrinho">🛒</span>
            <span data-testid="shopping-cart-size">{ count }</span>
          </Link>
          <Switch>
            <Route
              exact
              path="/"
              render={
                () => (
                  <ProductList
                    cartStateUpadte={ this.cartStateUpadte }
                    updateState={ this.updateState }
                  />)
              }
            />
            <Route
              exact
              path="/product/:id"
              render={
                (props) => (
                  <Product
                    { ...props }
                    products={ products }
                    cartStateUpadte={ this.cartStateUpadte }
                  />)
              }
            />
            <Route path="/checkout" component={ Checkout } />
            <Route
              exact
              path="/cart"
              render={
                () => (
                  <Cart
                    increseProduct={ this.increseProduct }
                    decreseProduct={ this.decreseProduct }
                    cartList={ cartList }
                  />)
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
