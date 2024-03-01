import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';
import {FONT_FAMILY} from '../../theme/theme';

const deviceWidth = Dimensions.get('window').width;

const Header = ({left, title, right, leftPressHandler, rightPressHandler}) => {
  return (
    <View
      style={{
        width: deviceWidth,
        height: 50,
        backgroundColor: COLORS.whiteColor,
        elevation: 8,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingRight: 8,
      }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
          <TouchableOpacity onPress={leftPressHandler} activeOpacity={0.35}>
            {left}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
            }}>
            {title}
          </Text>
        </View>

        <TouchableOpacity onPress={rightPressHandler} activeOpacity={0.35}>
          {right}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
