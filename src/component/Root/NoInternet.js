import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';

const NoInternet = () => {
  const [isPressed, setIsPressed] = useState(false);
  const onReloadHandler = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        style={{width: 600, height: 550}}
        source={require('../../animation/networkError.json')}
        autoPlay
        loop
      />
      <TouchableOpacity
        onPress={onReloadHandler}
        disabled={isPressed}
        activeOpacity={0.35}
        style={{
          backgroundColor: isPressed ? '#eef393' : COLORS.mainButtonColor,
          width: isPressed ? '50%' : '40%',
          paddingVertical: 12,
          borderRadius: 15,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
            color: COLORS.blackColor,
          }}>
          {isPressed ? 'Reloading...' : 'Reload'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternet;
