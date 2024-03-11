import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';

const HotelDetailsShower = ({title, content}) => {
  return (
    <View style={{gap: 3}}>
      <Text
        style={{
          fontSize: FONTS.extraInfo,
          fontWeight: WEIGHT.extraInfo,
          fontFamily: FONT_FAMILY.bold,
          color: COLORS.titleColor,
        }}>
        {title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          borderWidth: 1.5,
          borderColor: COLORS.primaryBorderColor,
          fontSize: FONTS.extraInfo,
          fontWeight: WEIGHT.extraInfo,
          fontFamily: FONT_FAMILY.medium,
          color: COLORS.primaryColor,
          borderRadius: 7,
          paddingVertical: 5,
          paddingLeft: 10,
        }}>
        {content}
      </Text>
    </View>
  );
};

export default HotelDetailsShower;
