import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesActionDelete, expensesActionEdit } from '../actions';

class WalletTable extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.tableRender = this.tableRender.bind(this);
  }

  handleChange({ target }) {
    const { expenses, removeExpense, editExpense } = this.props;
    const { id } = target.parentNode;
    if (target.id === 'delete-btn') {
      const expensesFiltered = expenses
        .filter(({ id: idExpense }) => idExpense !== Number(id));
      removeExpense(expensesFiltered);
    } else editExpense(true, id);
  }

  tableRender() {
    const { expenses } = this.props;
    return (
      expenses && expenses.map(
        ({ id, description, tag, method, value, currency, exchangeRates }) => (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[currency].name.split('/')[0] }</td>
            <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
            <td>
              { (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2) }
            </td>
            <td>Real</td>
            <td id={ id }>
              <button
                onClick={ this.handleChange }
                type="button"
                data-testid="edit-btn"
                id="edit-btn"
              >
                EDIT
              </button>
              <button
                onClick={ this.handleChange }
                type="button"
                data-testid="delete-btn"
                id="delete-btn"
              >
                X
              </button>
            </td>
          </tr>
        ),
      )
    );
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.tableRender() }
          </tbody>
        </table>
      </div>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
  editExpense: PropTypes.func,
  removeExpense: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenses) => dispatch(expensesActionDelete(expenses)),
  editExpense: (editValue, id) => dispatch(expensesActionEdit(editValue, id)),
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
