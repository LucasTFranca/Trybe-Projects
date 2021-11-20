export const TOKEN_TYPE = 'token';
export const QUEST_TYPE = 'quest';
export const SCORE_TYPE = 'score';
export const SET_PLAYER_VALUE = 'SET_PLAYER_VALUE';

export const tokenAction = (token) => ({
  type: TOKEN_TYPE,
  payload: { token },
});

export const setPlayerValueAction = (payload) => ({
  type: SET_PLAYER_VALUE, payload,
});

export const questAction = (quest) => ({
  type: QUEST_TYPE,
  payload: { quest },
});

export const scoreAction = (score) => ({
  type: SCORE_TYPE,
  payload: { score },
});

export const tokenActionThunk = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;

  dispatch(tokenAction(token));
};

export const questActionThunk = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();

  dispatch(questAction(data));
};
