import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletActionThunk, expensesActionThunk } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.htmlRender = this.htmlRender.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      payment: 'dinheiro',
      tag: 'alimentação',
    };
  }

  componentDidMount() {
    const { add } = this.props;
    add();
  }

  handleChange({ target }) {
    const { value, id } = target;
    this.setState({ [id]: value });
  }

  buttonChange() {
    const { id, value, description, currency, payment, tag } = this.state;
    const { expensesAdd } = this.props;
    expensesAdd({
      id,
      value,
      description,
      currency,
      method: payment,
      tag,
    });

    this.setState({ id: id + 1, value: '', description: '' });
  }

  htmlRender() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            value={ value }
            onChange={ this.handleChange }
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            value={ description }
            onChange={ this.handleChange }
            type="text"
            name="name"
          />
        </label>
      </>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        { this.htmlRender() }
        <label htmlFor="currency">
          Moeda:
          <select
            onChange={ this.handleChange }
            id="currency"
          >
            {
              currencies.map((currency) => (
                <option key={ currency }>{ currency }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select
            onChange={ this.handleChange }
            id="payment"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select onChange={ this.handleChange } id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button onClick={ this.buttonChange } type="button">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  add: PropTypes.func,
  expensesAdd: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch(walletActionThunk()),
  expensesAdd: (stateComponent) => dispatch(expensesActionThunk(stateComponent)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
