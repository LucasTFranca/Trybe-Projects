import { SET_PLAYER_VALUE, SCORE_TYPE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_VALUE:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SCORE_TYPE:
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
