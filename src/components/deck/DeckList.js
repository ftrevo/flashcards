import { FlatList, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../../actions/deck';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(handleInitialData());
  };

  onPressDeck(deckId) {
    const { navigation } = this.props;

    navigation.navigate('DeckPreview', { deckId });
  };

  render() {
    const { deckPreviewList } = this.props;

    if (deckPreviewList === null || deckPreviewList.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            No decks to see here, add some :)
          </Text>
        </View>
      )
    }

    return (
      <FlatList style={styles.container}
        data={deckPreviewList}
        keyExtractor={(item) => item.deckId}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.center}
            onPress={() => this.onPressDeck(item.deckId)}
          >
            <DeckListItem
              questionCount={item.questionCount}
              title={item.title}
            />
          </TouchableOpacity>
        )}
      />)
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
  }
);

const mapStateToProps = (state) => {
  const deckPreviewList = Object.keys(state)
    .map(
      deckId => (
        {
          deckId,
          questionCount: state[deckId].questions.length,
          title: state[deckId].title,
        }
      )
    );

  return { deckPreviewList }
};

export default connect(mapStateToProps)(DeckList);


