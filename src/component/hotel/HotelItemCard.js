import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const HotelItemCard = ({hotelItem, guests, journeyDates}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('HotelDetails', {
          hotelItem: hotelItem,
          guests: guests,
          journeyDates: journeyDates,
        })
      }
      activeOpacity={0.35}
      key={hotelItem?._id}
      style={{
        borderWidth: 1.5,
        borderColor: COLORS.primaryBorderColor,
        backgroundColor: COLORS.whiteColor,
        flexDirection: 'row',
        height: hp('30%'),
        marginBottom: 10,
        borderRadius: 7,
        overflow: 'hidden',
      }}>
      <Image
        source={{uri: hotelItem?.hotelImage}}
        style={{width: '35%', height: '100%'}}
      />
      <View style={{width: '65%', padding: 10, gap: 10}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            color: COLORS.primaryColor,
            fontFamily: FONT_FAMILY.bold,
          }}>
          {hotelItem?.hotelName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {hotelItem?.rating}
          </Text>
          <AntDesignIcon name="star" size={24} color={COLORS.ratingColor} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <IoniconsIcon
            name="location-outline"
            size={22}
            color={COLORS.primaryColor}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {hotelItem?.shortAddress}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              borderWidth: 1,
              borderColor: COLORS.primaryColor,
              paddingHorizontal: 16,
              paddingVertical: 4,
              backgroundColor: COLORS.backgroundColor,
              color: COLORS.primaryColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
            }}>
            {hotelItem?.hotelType}
          </Text>
        </View>
        {hotelItem?.isRecommended ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                borderWidth: 1,
                borderColor: COLORS.mainButtonColor,
                paddingHorizontal: 16,
                paddingVertical: 4,
                backgroundColor: COLORS.mainButtonColor,
                color: COLORS.whiteColor,
                borderRadius: 7,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Recommanded
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}></Text>
          </View>
        )}

        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            ₹{hotelItem?.price + '\nTotal For 2 nights'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelItemCard;
