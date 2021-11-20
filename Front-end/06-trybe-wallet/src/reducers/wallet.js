// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  WALLET_TYPE, EXPENSES_TYPE, EXPENSES_DELETE_TYPE, EXPENSES_EDIT_TYPE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: false,
};

const wallet = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case WALLET_TYPE:
    return {
      ...state,
      currencies: payload.currencies,
    };
  case EXPENSES_TYPE:
    return {
      ...state,
      expenses: [...state.expenses, payload.expenses],
    };
  case EXPENSES_DELETE_TYPE:
    return {
      ...state,
      expenses: payload.expenses,
    };
  case EXPENSES_EDIT_TYPE:
    return {
      ...state,
      editExpense: payload.editValue,
      editId: payload.id,
    };
  default:
    return state;
  }
};

export default wallet;
