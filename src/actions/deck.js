import { fetchDecks, addNewDeck, removeOldDeck } from '../utils/api';

// Action Types
const ADD_DECK = 'ADD_DECK';
const REMOVE_DECK = 'REMOVE_DECK';
const RECEIVE_DECKS = 'RECEIVE_DECKS';

// Action Creators
const addDeck = (deck) => (
  { type: ADD_DECK, deck }
);

const removeDeck = (deckId) => (
  { type: REMOVE_DECK, deckId, }
);

const receiveDecks = (decks) => (
  { type: RECEIVE_DECKS, decks }
);

//Redux-Thunk Handlers
const handleInitialData = () => {
  return async (dispatch) => {
    const decksFromApi = await fetchDecks();
    await dispatch(receiveDecks(decksFromApi));
  };
};

const handleAddDeck = (deckId, deckTitle) => {
  return async (dispatch) => {
    const newDeck = await addNewDeck(deckId, deckTitle);
    await dispatch(addDeck(newDeck));
  };
};

const handleRemoveDeck = (deckId) => {
  return async (dispatch) => {
    await removeOldDeck(deckId);
    await dispatch(removeDeck(deckId));
  };
};

export {
  ADD_DECK,
  addDeck,
  REMOVE_DECK,
  removeDeck,
  RECEIVE_DECKS,
  receiveDecks,
  handleInitialData,
  handleAddDeck,
  handleRemoveDeck,
};