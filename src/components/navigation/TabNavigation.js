import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { purple, white } from '../../utils/colors';

import NewDeck from '../deck/NewDeck';
import DeckList from '../deck/DeckList';

const tabObject = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) =>
        <MaterialCommunityIcons
          name={Platform.OS === 'ios' ? 'cards-outline' : 'cards'}
          size={30}
          color={tintColor}
        />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) =>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle'}
          size={30}
          color={tintColor}
        />
    }
  }
};

const options = {
  navigationOptions: {
    headers: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      showIcon: true,
      padding: 10,
    },
  },
};

const Tabs =
  createAppContainer(
    Platform.OS === 'ios' ?
      createBottomTabNavigator(tabObject, options)
      :
      createMaterialTopTabNavigator(tabObject, options)
  );

export default Tabs;

