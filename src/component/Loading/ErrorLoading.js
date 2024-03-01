import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';

const ErrorLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
      }}>
      <ActivityIndicator size={'large'} color={COLORS.primaryColor} />
      <Text style={{fontSize: FONTS.appTittle, fontWeight: WEIGHT.appTittle}}>
        Please Wait...
      </Text>
    </View>
  );
};

export default ErrorLoading;
