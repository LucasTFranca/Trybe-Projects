import { QUEST_TYPE } from '../actions/index';

const INITIAL_STATE = {};

const quest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUEST_TYPE:
    return action.payload.quest;
  default:
    return state;
  }
};

export default quest;
