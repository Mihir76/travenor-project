import React from 'react';
import StackNavigation from './src/navigation/StackNavigator';
import {ModalPortal} from 'react-native-modals';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StackNavigation />
      <ModalPortal />
    </>
  );
};

export default App;
