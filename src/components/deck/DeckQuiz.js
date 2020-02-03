import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizResults from '../QuizResults';
import { clearLocalNotification, setLocalNotification } from '../../utils/notificationCentral';
import { blue, purple, gray, green, red, yellow, lightGray, white } from '../../utils/colors';
import { Ionicons, AntDesign } from '@expo/vector-icons';

class DeckQuiz extends Component {
  state = {
    totalQuestions: 0,
    correct: 0,
    incorrect: 0,
    alreadyAnswered: [],
    flipped: [],
  };

  async componentDidMount() {
    await clearLocalNotification();
    await setLocalNotification();
  }

  onPressRestart = async () => {
    await this.setState(
      (previousState) => (
        {
          totalQuestions: 0,
          correct: 0,
          incorrect: 0,
          alreadyAnswered: [],
          flipped: [],
        }
      )
    );
  }

  async onPressCard(position) {
    const { flipped } = this.state;

    if (flipped.includes(position)) {
      await this.setState({ flipped: flipped.filter(cardIndex => cardIndex !== position) });
    } else {
      await this.setState({ flipped: flipped.concat([position]) });
    }
  };

  async onPressAnswer(position, correct) {
    if (correct) {
      await this.setState(
        (previousState) => (
          {
            alreadyAnswered: previousState.alreadyAnswered.concat([position]),
            correct: previousState.correct + 1,
          }
        )
      );
    } else {
      await this.setState(
        (previousState) => (
          {
            alreadyAnswered: previousState.alreadyAnswered.concat([position]),
            incorrect: previousState.incorrect + 1,
          }
        )
      );
    }
  };

  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            No deck to display.
          </Text>
        </View>
      );
    }

    const { questions, title } = deck;

    if (!questions || questions.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            No questions on this deck.
          </Text>
        </View>
      );
    }

    const { alreadyAnswered } = this.state;

    if (alreadyAnswered.length === questions.length) {
      return (
        <View style={styles.emptyView}>
          <QuizResults
            correct={this.state.correct}
            incorrect={this.state.incorrect}
            navigation={this.props.navigation}
          />
          <TouchableOpacity style={styles.button} onPress={this.onPressRestart}>
            <Text style={styles.fontWhite}> Restart </Text>
          </TouchableOpacity>
        </View>
      )
    }


    return (
      <ScrollView >
        <Text style={styles.quizName}>
          {title} - {alreadyAnswered.length}/{questions.length}
        </Text>
        {
          questions.map(
            (question, index) => (
              !alreadyAnswered.includes(index) && (
                <View key={index} style={styles.questionContainer}>
                  <View
                    style={
                      [
                        this.state.flipped.includes(index) ? styles.answerCard : styles.questionCard,
                        styles.flex9,
                      ]
                    }>
                    <TouchableOpacity style={styles.cardQuestionArea} onPress={() => this.onPressCard(index)}>
                      <Text >
                        {this.state.flipped.includes(index) ? question.answer : question.question}
                      </Text>
                    </TouchableOpacity>

                  </View>
                  <View style={styles.flex1}>
                    <TouchableOpacity
                      onPress={() => this.onPressAnswer(index, true)}
                    >
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox'}
                        size={36}
                        color={green}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPressAnswer(index, false)}
                    >
                      <AntDesign
                        name={Platform.OS === 'ios' ? 'closesquareo' : 'closesquare'}
                        size={30}
                        color={red}
                      />
                    </TouchableOpacity>

                  </View>
                </View>
              )
            )
          )
        }
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      marginLeft: 5,
      marginRight: 5,
    },
    emptyView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 35,
      fontWeight: 'bold',
    },
    button: {
      padding: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      margin: 10,
      backgroundColor: blue
    },
    quizName: {
      fontSize: 35,
      textAlign: 'center',
      color: purple,
    },
    questionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
      borderColor: gray,
      borderRadius: 1,
      borderWidth: 1,
      padding: 5,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row',
    },
    flex1: {
      flex: 1,
    },
    flex9: {
      flex: 9,
      marginRight: 10,
    },
    cardQuestionArea: {
      height: 80,
    },
    questionCard: {
      backgroundColor: lightGray
    },
    answerCard: {
      backgroundColor: yellow
    },
    fontWhite: {
      color: white
    },
  }
);

const mapStateToProps = (state, props) => {
  return { deck: state[props.navigation.state.params.deckId] }
};

export default connect(mapStateToProps)(DeckQuiz);


