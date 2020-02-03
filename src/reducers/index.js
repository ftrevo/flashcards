import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from '../actions/deck';
import { ADD_CARD } from '../actions/card';

const saveCardReducer = (previousState, action) => (
  {
    ...previousState,
    [action.deckId]:
    {
      ...previousState[action.deckId],
      questions: previousState[action.deckId].questions.concat([action.card])
    }
  }
);

const removeDeckReducer = (previousState, deckId) => {
  const newState = {
    ...previousState,
  };

  newState[deckId] = undefined;
  delete newState[deckId];

  return newState;
};

const mainReducer = (previousState = {}, action) => {
  const actions = {
    [RECEIVE_DECKS]: () => ({ ...action.decks }),
    [ADD_DECK]: () => ({ ...previousState, ...action.deck }),
    [ADD_CARD]: () => saveCardReducer(previousState, action),
    [REMOVE_DECK]: () => (removeDeckReducer(previousState, action.deckId)),
  };

  return actions[action.type] ? actions[action.type]() : previousState;
};

export default mainReducer;