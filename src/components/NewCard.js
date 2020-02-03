import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions/card';
import { gray, purple } from '../utils/colors';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleQuestionChange = text => {
    this.setState((previousState) => ({ question: text }));
  };

  handleAnswerChange = text => {
    this.setState((previousState) => ({ answer: text }));
  };

  handleSubmit = async () => {
    const { dispatch, navigation } = this.props;

    const deckId = navigation.state.params.deckId;

    await dispatch(handleAddCard(deckId, { ...this.state }));

    this.setState((previousState) => ({ question: '', answer: '' }));

    navigation.navigate('DeckPreview', { deckId });
  };

  render() {
    return (
      <View
        style={styles.defaultView}
        behavior='padding'
        enabled
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 78 })}
      >
        <Text style={[styles.titleLabel, styles.marginTop30]}>Question</Text>
        <TextInput
          style={[styles.textInput, styles.marginTop30]}
          value={this.state.question}
          onChangeText={this.handleQuestionChange}
          placeholder='Question'
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          ref={(input) => { this.firstTextInput = input; }}
          multiline={true}
        />
        <Text style={[styles.titleLabel, styles.marginTop30]}>Answer</Text>
        <TextInput
          style={[styles.textInput, styles.marginTop30]}
          value={this.state.answer}
          onChangeText={this.handleAnswerChange}
          placeholder='Answer'
          onSubmitEditing={this.state.question === '' ? () => { this.firstTextInput.focus() } : this.handleSubmit}
          ref={(input) => { this.secondTextInput = input; }}
          multiline={true}
        />
        <TouchableOpacity
          style={[styles.button, styles.marginTop30]}
          onPress={this.handleSubmit}
          disabled={this.state.question === '' || this.state.answer === ''}
        >
          <Text style={styles.buttonText}>Create Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create(
  {
    defaultView: {
      alignItems: 'center',
      flex: 1,
    },
    button: {
      padding: 10,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      margin: 10,
      backgroundColor: gray,
    },
    buttonText: {
      width: 100,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 35,
      fontWeight: 'bold',
    },
    titleLabel: {
      fontSize: 25,
      color: purple
    },
    textInput: {
      borderWidth: 1,
      borderColor: gray,
      padding: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 80,
      width: 400,
      textAlign: 'center',
    },
    marginTop30: {
      marginTop: 30
    }
  }
);

export default connect()(NewCard);