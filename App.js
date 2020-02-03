import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import reducer from './src/reducers';
import middleware from './src/middlewares';

import CustomStatusBar from './src/components/CustomStatusBar';
import Stack from './src/components/navigation/StackNavigation';
import { setLocalNotification } from './src/utils/notificationCentral';

const store = createStore(reducer, middleware);

class App extends React.Component {

  async componentDidMount() {
    await setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar barStyle='light-content' />
          <Stack />
        </View>
      </Provider>
    );
  };
};

export default App;

