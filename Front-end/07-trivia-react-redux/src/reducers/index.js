import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import quest from './quest';

const rootReducer = combineReducers({
  player,
  quest,
  token,
});

export default rootReducer;
