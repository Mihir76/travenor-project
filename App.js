import React from 'react';
import StackNavigation from './src/navigation/StackNavigator';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  return (
    <>
      <StackNavigation />
      <ModalPortal />
    </>
  );
};

export default App;
