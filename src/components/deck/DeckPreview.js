import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';
import { handleRemoveDeck } from '../../actions/deck';
import { gray, red, blue, white } from '../../utils/colors';

class DeckPreview extends Component {
  onPressAddCard(deckId) {
    const { navigation } = this.props;
    navigation.navigate('NewCard', { deckId });
  };

  async onPressRemoveDeck(deckId) {
    const { dispatch, navigation } = this.props;

    await dispatch(handleRemoveDeck(deckId));

    navigation.navigate('DeckList');
  };

  onPressStartQuiz(deckId) {
    const { navigation } = this.props;

    navigation.navigate('DeckQuiz', { deckId });
  }

  render() {
    const { deck, deckId } = this.props;

    if (!deck) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            No deck to display.
        </Text>
        </View>
      );
    }

    return (
      <View style={styles.mainView}>
        <DeckListItem
          title={deck.title}
          questionCount={deck.questions.length}
        />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: gray }]}
            onPress={() => this.onPressAddCard(deckId)}
          >
            <Text style={styles.buttonText}>
              Add card
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: blue }]}
            onPress={() => this.onPressStartQuiz(deckId)}
          >
            <Text style={styles.buttonText}>
              Start Quiz
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: red }]}
            onPress={() => this.onPressRemoveDeck(deckId)}
          >
            <Text style={styles.buttonText}>
              Remove
          </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}></View>
      </View>
    )
  }
};

const styles = StyleSheet.create(
  {
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainView: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'stretch',
      marginLeft: 5,
      marginRight: 5,
    },
    emptyView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      margin: 10,
    },
    buttonText: {
      width: 80,
      textAlign: 'center',
      color: white
    },
    emptyText: {
      fontSize: 35,
      fontWeight: 'bold',
    },
  }
);

const mapStateToProps = (state, props) => {
  const { deckId, navigation } = props;

  const toBeSearched = deckId || navigation.state.params.deckId;

  return { deck: state[toBeSearched], deckId: toBeSearched }
};

export default connect(mapStateToProps)(DeckPreview);


