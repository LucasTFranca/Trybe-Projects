import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { fullName, email, cpf, phone, cep, address } = this.state;
    return (
      <form>
        <label htmlFor="fullName">
          Nome Completo:
          <input
            type="text"
            value={ fullName }
            required
            data-testid="checkout-fullname"
            id="fullName"
            name="fullName"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            required
            value={ email }
            id="email"
            data-testid="checkout-email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            type="text"
            required
            value={ cpf }
            id="cpf"
            data-testid="checkout-cpf"
            name="cpf"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="phone">
          Telefone:
          <input
            type="text"
            required
            value={ phone }
            id="phone"
            data-testid="checkout-phone"
            name="phone"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            type="text"
            required
            value={ cep }
            id="cep"
            data-testid="checkout-cep"
            name="cep"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            type="text"
            required
            value={ address }
            id="address"
            data-testid="checkout-address"
            name="address"
            onChange={ this.handleChange }
          />
        </label>

      </form>
    );
  }
}

export default Checkout;
