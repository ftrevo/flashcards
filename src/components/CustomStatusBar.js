import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { purple } from '../utils/colors';

const CustomStatusBar = ({ backgroundColor, ...props }) => (
  <SafeAreaView style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={purple} {...props} />
  </SafeAreaView>
);

export default CustomStatusBar;