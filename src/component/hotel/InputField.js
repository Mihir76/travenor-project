import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';

const InputField = ({title, icon, value, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.35}
      style={{
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: COLORS.whiteColor,
        borderWidth: 1.5,
        borderColor: COLORS.primaryBorderColor,
        borderRadius: 8,
        paddingBottom: 4,
        paddingLeft: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 4,
          gap: 10,
          alignItems: 'center',
        }}>
        <View style={{width: '7.5%'}} />
        <Text
          style={{
            paddingTop: 4,
            fontSize: FONTS.placeHolder,
            fontWeight: WEIGHT.placeHolder,
          }}>
          {title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 8,
          paddingBottom: 4,
          gap: 10,
          alignItems: 'center',
        }}>
        <View style={{width: '7.5%'}}>{icon}</View>
        {value}
      </View>
    </TouchableOpacity>
  );
};

export default InputField;
