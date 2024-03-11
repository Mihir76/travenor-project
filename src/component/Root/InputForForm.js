import {Text, View, TextInput} from 'react-native';
import React from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';

const InputForForm = ({title, value, setValue, placeholder, maxLength}) => {
  return (
    <View style={{gap: 3}}>
      <Text
        style={{
          fontSize: FONTS.mediumText,
          fontWeight: WEIGHT.mediumText,
          fontFamily: FONT_FAMILY.medium,
          color: COLORS.primaryColor,
        }}>
        {title} *
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: COLORS.primaryBorderColor,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 7,
          fontSize: FONTS.mediumText,
          fontWeight: WEIGHT.mediumText,
          fontFamily: FONT_FAMILY.medium,
          color: COLORS.blackColor,
        }}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        autoCorrect={false}
        maxLength={maxLength}
      />
    </View>
  );
};

export default InputForForm;
