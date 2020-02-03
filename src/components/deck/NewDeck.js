import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { handleAddDeck } from '../../actions/deck';
import { gray, purple } from '../../utils/colors';

class NewDeck extends Component {
  state = {
    text: ''
  };

  handleChange = text => {
    this.setState({ text });
  };

  handleSubmit = async () => {
    const { dispatch, navigation } = this.props;
    const { text } = this.state;

    const deckId = v4();

    await dispatch(handleAddDeck(deckId, text));

    this.setState((previousState) => ({ text: '' }));

    navigation.navigate('DeckPreview', { deckId });
  };

  render() {
    return (
      <View style={styles.defaultView}>
        <Text style={[styles.titleLabel, { marginTop: 30 }]}>Deck Title</Text>
        <TextInput
          style={[styles.textInput, { marginTop: 30 }, { maxHeight: 280 }]}
          value={this.state.text}
          onChangeText={this.handleChange}
          placeholder='Deck Name'
          onSubmitEditing={this.handleSubmit}
          multiline={true}
        />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
            disabled={this.state.text === ''}
          >
            <Text style={styles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 20 }}></View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create(
  {
    defaultView: {
      flex: 1,
      alignItems: 'center',
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
  }
);

export default connect()(NewDeck);