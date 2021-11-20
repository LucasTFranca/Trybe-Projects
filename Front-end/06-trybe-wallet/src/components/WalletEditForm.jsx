import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesActionDelete, expensesActionEdit } from '../actions';

class WalletEditForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.htmlRender = this.htmlRender.bind(this);
    this.stateUpdate = this.stateUpdate.bind(this);

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
    this.stateUpdate();
  }

  stateUpdate() {
    const { editId, expenses } = this.props;
    const { id, value, description, currency, method: payment, tag } = expenses
      .find(({ id: findId }) => findId === Number(editId));

    this.setState({ id, value, description, currency, payment, tag });
  }

  handleChange({ target }) {
    const { value, id } = target;
    this.setState({ [id]: value });
  }

  buttonChange() {
    const { id, value, description, currency, payment: method, tag } = this.state;
    const { expenseEditor, expenses, editExpense } = this.props;
    const expensesFiltered = expenses.map((element) => {
      if (id === element.id) {
        return {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: element.exchangeRates,
        };
      }
      return element;
    });

    expenseEditor(expensesFiltered);
    editExpense(false, 0);
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
        <button
          data-testid="edit-btn"
          onClick={ this.buttonChange }
          type="button"
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

WalletEditForm.propTypes = {
  expenseEditor: PropTypes.func,
  currencies: PropTypes.objectOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  expenseEditor: (expenses) => dispatch(expensesActionDelete(expenses)),
  editExpense: (editValue, id) => dispatch(expensesActionEdit(editValue, id)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editId: wallet.editId,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditForm);
