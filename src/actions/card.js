import { addCardToDeck } from '../utils/api';

// Action Types
const ADD_CARD = 'ADD_CARD';

// Action Creators
const addCard = (deckId, card) => (
  { type: ADD_CARD, card, deckId }
);

//Redux-Thunk Handlers
const handleAddCard = (deckId, card) => {
  return async (dispatch) => {
    await addCardToDeck(deckId, card);

    await dispatch(addCard(deckId, card));
  };
};

export {
  ADD_CARD,
  addCard,
  handleAddCard,
};