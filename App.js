import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONT_FAMILY} from './src/theme/Colors';
const App = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <View style={{backgroundColor: COLORS.primaryColorBlur}}>
      <Text style={{fontFamily: FONT_FAMILY.bold}}>App</Text>
      <Icon
        name="car"
        size={30}
        color={isActive ? COLORS.primaryColor : 'black'}
      />
    </View>
  );
};

export default App;
