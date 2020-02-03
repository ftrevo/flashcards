# Would You Rather Project

* install all project dependencies with `npm install`
* start the expo server with `npm start`

## A single modification
* To change from the question and the answer, tap on the text, i did not made a explicit button for this.

## Isues
* I could not make KeyboardAvoidingView work, tried a lot of things, but with no sucess :(. If you could point the correct way of doing it, i will be glad!

## What You're Getting
```bash
├── .gitignore #git ignore file.
├── App.js # The root of the app.
├── app.json # app.json file with default configs and a lilte extra
├── babel.config.js # Default babel stuff
├── package-lock.json # npm package manager file.
├── package.json # npm package manager file.
├── README.md - This file.
├── assets
│   ├── icon.png # Default expo, did not changed that
│   └── splash.pngn # Default expo, did not changed that
└── src
    ├── actions # Actions for this project.
    │   ├── card.js  # Card actions
    │   └── deck.js  # Deck actions
    ├── components # Custom components for this project.
    │   ├── deck # Components used in deck
    │   │   ├── DeckList.js # Component that list the decks
    │   │   ├── DeckListItem.js # Component for deck list item
    │   │   ├── DeckPreview.js # Component deck preview
    │   │   ├── DeckQuiz.js # Component for quiz
    │   │   └── NewDeck.js # Component for new deck
    │   ├── navigation # Components used in users
    │   │   ├── StackNavigation.js # Stack navigation structure and component
    │   │   └── TabNavigation.js # Tab navigation structure and component
    │   ├── CustomStatusBar.js # Custom status bar component
    │   ├── NewCard.js # Component for new card
    │   └── QuizResults.js # Component that dispay quiz results
    ├── middlewares # Middlewares for this project.
    │   ├── index.js # Default middleware file
    │   └── logger.js  # Logger middleware
    ├── reducers # Reducers for this project.
    │   └── index.js  # Reducer for deck purposes
    └── utils # Utils folder.
        ├── api.js  # Api folder
        ├── color.js  # color utils
        └── notificationCentral.js  # notification stuff
```

### A huge sorry fom my CSS skills :(
