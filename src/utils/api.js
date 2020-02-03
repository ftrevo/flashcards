import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_DECKS_KEY = 'MobileFlashcards:decks'

const startingDeck = {
  React: {
    title: 'React Title',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript Title',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

const addNewDeck = async (deckId, deckTitle) => {
  const newDeck = {
    [deckId]: {
      title: deckTitle,
      questions: [],
    },
  };

  await AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_DECKS_KEY,
    JSON.stringify(newDeck),
  );

  return newDeck;
};

const removeOldDeck = async (deckId) => {
  const rawStringData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY);

  const jsonData = JSON.parse(rawStringData);

  jsonData[deckId] = undefined;
  delete jsonData[deckId];

  return AsyncStorage.setItem(
    MOBILE_FLASHCARDS_DECKS_KEY,
    JSON.stringify(jsonData),
  );
};

const addCardToDeck = async (deckId, card) => {
  const rawStringData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY);

  const deck = JSON.parse(rawStringData)[deckId];

  await AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_DECKS_KEY,
    JSON.stringify(
      {
        [deckId]: {
          questions: [...deck.questions].concat(card)
        }
      }
    )
  );
};

const fetchDecks = async () => {
  let rawStringData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY);

  if (!rawStringData) {
    rawStringData = await inputInitialData();
  }

  return JSON.parse(rawStringData);
};

const inputInitialData = async () => {
  await AsyncStorage.setItem(MOBILE_FLASHCARDS_DECKS_KEY, JSON.stringify(startingDeck));

  const rawStringData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_KEY);

  return rawStringData;
};

export {
  addNewDeck,
  removeOldDeck,
  fetchDecks,
  addCardToDeck,
};