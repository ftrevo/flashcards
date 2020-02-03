import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Tabs from './TabNavigation';
import DeckPreview from '../deck/DeckPreview';
import NewCard from '../NewCard';
import DeckQuiz from '../deck/DeckQuiz';
import { Platform } from 'react-native';
import { purple, white } from '../../utils/colors';

const defaultColorOptions = {
  headerTintColor: Platform.OS === 'ios' ? purple : white,
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? white : purple,
  },
};

const Stack =
  createAppContainer(
    createStackNavigator({
      Home: {
        screen: Tabs,
        header: null,
        navigationOptions: {
          headerShown: false,
          title: null,
          headerBackTitle: null
        },
      },
      DeckPreview: {
        screen: DeckPreview,
        navigationOptions: {
          title: 'Deck Preview',
          ...defaultColorOptions,
        }
      },
      NewCard: {
        screen: NewCard,
        navigationOptions: {
          title: 'New Card',
          ...defaultColorOptions,
        }
      },
      DeckQuiz: {
        screen: DeckQuiz,
        navigationOptions: {
          title: 'Deck Quiz',
          ...defaultColorOptions,
        }
      },
    })
  );

export default Stack;

