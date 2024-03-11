import {StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let isExistingUser;

const SplashScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('isExistingUser')
      .then(value => {
        isExistingUser = value;
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      if (isExistingUser === null || isExistingUser === undefined) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Bottom');
      }
    }, 2000);
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryColorBlur,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
      }}>
      <StatusBar
        backgroundColor={COLORS.primaryColorBlur}
        barStyle={'dark-content'}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>App Logo</Text>
        <Text>App Name</Text>
      </View>
      <Text
        style={{
          color: COLORS.blackColor,
          fontFamily: FONT_FAMILY.medium,
          fontWeight: WEIGHT.extraInfo,
          fontSize: FONTS.extraInfo,
        }}>
        Version 1.0.0
      </Text>
    </View>
  );
};

export default SplashScreen;
