import { View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { purple, gray } from '../../utils/colors';

class DeckListItem extends Component {

  render() {
    const { questionCount, title } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.questionCount}>
          {questionCount} questions
        </Text>
      </View>
    )
  };
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
      borderColor: gray,
      borderRadius: 1,
      borderWidth: 1,
      padding: 30,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: purple
    },
    questionCount: {
      fontSize: 25,
      fontStyle: 'italic',
      color: gray
    },
  }
);


export default DeckListItem;