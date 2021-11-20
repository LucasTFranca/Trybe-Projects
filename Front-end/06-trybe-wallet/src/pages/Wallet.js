import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';
import WalletEditForm from '../components/WalletEditForm';

class Wallet extends React.Component {
  render() {
    const { email, expenses, editExpense } = this.props;
    const totalField = expenses.reduce(
      (accumulator, { value, exchangeRates, currency }) => (
        accumulator + Number(value) * Number(exchangeRates[currency].ask)
      ),
      0,
    );
    return (
      <div>
        <header>
          <p>
            <span data-testid="email-field">{ email }</span>
            <span data-testid="total-field">{ totalField }</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        {/* <WalletForm /> */}
        { editExpense ? <WalletEditForm /> : <WalletForm /> }
        <WalletTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.string),
  editExpense: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  editExpense: wallet.editExpense,
});

export default connect(mapStateToProps)(Wallet);
