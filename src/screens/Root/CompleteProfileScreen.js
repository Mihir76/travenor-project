import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useStore} from '../../../store';

const CompleteProfileScreen = () => {
  useEffect(() => {
    if (
      (userDetails?.name != null || userDetails?.name != undefined) &&
      userDetails?.name.length > 0
    ) {
      setName(userDetails?.name);
    }

    if (
      (userDetails?.phone != null || userDetails?.phone != undefined) &&
      userDetails?.phone.length > 0
    ) {
      setContactNumber(userDetails?.phone);
    }
  }, []);
  const {userDetails} = useStore();
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingHorizontal: 8,
        paddingTop: 10,
        gap: 15,
      }}>
      {/* email  */}
      <View style={{gap: 5}}>
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Email
        </Text>
        <Text
          style={{
            marginHorizontal: 12,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            paddingVertical: 4,
            paddingHorizontal: 6,
            backgroundColor: COLORS.whiteColor,
            borderRadius: 7,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.medium,
            color: COLORS.primaryColor,
          }}>
          {userDetails?.email}
        </Text>
      </View>

      {/* name  */}
      <View style={{gap: 5}}>
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Name
        </Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter Your Name"
          style={{
            marginHorizontal: 12,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            paddingVertical: 4,
            paddingHorizontal: 10,
            backgroundColor: COLORS.whiteColor,
            borderRadius: 7,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.medium,
            color: COLORS.primaryColor,
          }}
        />
      </View>

      {/* Phone Number  */}
      <View style={{gap: 5}}>
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Contact Number
        </Text>
        <TextInput
          value={contactNumber}
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={text => setContactNumber(text)}
          placeholder="Enter Your Contact Number"
          style={{
            marginHorizontal: 12,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            paddingVertical: 4,
            paddingHorizontal: 10,
            backgroundColor: COLORS.whiteColor,
            borderRadius: 7,
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.medium,
            color: COLORS.primaryColor,
          }}
        />
      </View>
      <Text>address line1</Text>
      <Text>landmark</Text>
      <Text>city</Text>
      <Text>zip</Text>
    </View>
  );
};

export default CompleteProfileScreen;
