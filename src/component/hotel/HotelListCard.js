import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';

const HotelListCard = ({Destination, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.35}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 10,
      }}>
      <Image
        source={{uri: Destination.image}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <Text
        style={{
          fontSize: FONTS.extraInfo,
          fontWeight: WEIGHT.extraInfo,
          color: COLORS.primaryColor,
        }}>
        {Destination.name}
      </Text>
    </TouchableOpacity>
  );
};

export default HotelListCard;
