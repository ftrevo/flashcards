import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { gray, green, red, white } from '../utils/colors';

class QuizResults extends Component {
  onPressGoToHome = async () => {
    const { navigation } = this.props;

    navigation.navigate('DeckList');
  };

  render() {
    const { correct, incorrect } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.correctAnswers}>
          Correct Answers - {correct}
        </Text>
        <Text style={styles.wrongAnswers}>
          Incorrect Answers - {incorrect}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.onPressGoToHome()} >
          <Text style={styles.fontWhite}>
            Try other decks!
          </Text>
        </TouchableOpacity>
      </View>
    )
  };
};

const styles = StyleSheet.create(
  {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
      borderColor: gray,
      borderRadius: 1,
      borderWidth: 1,
      padding: 30,
      paddingBottom: 10,
    },
    correctAnswers: {
      fontSize: 25,
      fontWeight: 'bold',
      color: green
    },
    wrongAnswers: {
      fontSize: 25,
      fontWeight: 'bold',
      color: red
    },
    questionCount: {
      fontSize: 25,
      fontStyle: 'italic',
      color: gray
    },
    button: {
      padding: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      margin: 10,
      backgroundColor: gray
    },
    fontWhite: {
      color: white
    },
  }
);

export default QuizResults;


