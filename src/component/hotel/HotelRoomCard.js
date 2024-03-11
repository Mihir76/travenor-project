import {Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const HotelRoomCard = ({room, journeyDates, guests, hotelInfo}) => {
  const navigation = useNavigation();
  const [stayDay, setStayDay] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let endYear = journeyDates.endDate.split('-')[0];
    let startYear = journeyDates.startDate.split('-')[0];
    let endingMonth = journeyDates.endDate.split('-')[1];
    let startingMonth = journeyDates.startDate.split('-')[1];
    let monthCount = endingMonth - startingMonth;
    let endingDay = journeyDates.endDate.split('-')[2];
    let startingDay = journeyDates.startDate.split('-')[2];
    let dayCount = endingDay - startingDay;
    let multiplyDay = (monthCount * startingMonth) % 2 == 0 ? 30 : 31;
    let stayDay = dayCount + monthCount * multiplyDay + (endYear - startYear);
    setStayDay(stayDay);
  }, []);
  useEffect(() => {
    if (stayDay > 0) {
      stayDay % 2 == 0
        ? setPrice(room?.roomPrice * (stayDay / 2))
        : setPrice(
            parseInt(room?.roomPrice) * Math.floor(stayDay / 2) +
              parseInt(room?.roomPrice / 2),
          );
    }
  }, [stayDay]);
  return (
    <View style={{gap: 3}}>
      <Text
        numberOfLines={1}
        style={{
          width: '95%',
          fontSize: FONTS.extraInfo,
          fontWeight: WEIGHT.extraInfo,
          fontFamily: FONT_FAMILY.bold,
          color: COLORS.primaryColor,
        }}>
        {room?.roomName}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <IoniconsIcons
          name="information-circle"
          size={24}
          color={COLORS.primaryGreen}
        />
        <Text
          style={{
            fontSize: FONTS.placeHolder,
            fontWeight: WEIGHT.placeHolder,
            color: COLORS.primaryGreen,
          }}>
          Essential Information
        </Text>
      </View>
      <Text
        style={{
          width: '100%',
          backgroundColor: COLORS.primaryBorderColor,
          height: 2,
        }}
      />
      <Image
        resizeMode="cover"
        source={{uri: room?.roomImage}}
        style={{
          width: wp('90%'),
          height: hp('25%'),
          alignSelf: 'center',
          marginTop: 5,
          borderRadius: 7,
        }}
      />
      <View
        style={{
          gap: 3,
          borderWidth: 1,
          borderColor: COLORS.primaryBorderColor,
          padding: 5,
          borderRadius: 7,
          marginTop: 5,
        }}>
        <Text
          style={{
            fontSize: FONTS.forgotText,
            fontWeight: WEIGHT.forgotText,
            color: COLORS.primaryGreen,
          }}>
          Free Cancellation before{' '}
          {`${
            parseInt(journeyDates?.startDate.split('-')[2]) - 2 <= 0
              ? 30
              : parseInt(journeyDates?.startDate.split('-')[2]) - 2
          }/${
            parseInt(journeyDates?.startDate.split('-')[2]) - 2 <= 0
              ? journeyDates?.startDate.split('-')[1] - 1 == 0
                ? 1
                : journeyDates?.startDate.split('-')[1] - 1
              : journeyDates?.startDate.split('-')[1]
          }/${
            parseInt(journeyDates?.startDate.split('-')[2]) - 2 <= 0
              ? journeyDates?.startDate.split('-')[0] - 1
              : journeyDates?.startDate.split('-')[0]
          }`}
        </Text>
        <Text
          style={{
            fontSize: FONTS.forgotText,
            fontWeight: WEIGHT.forgotText,
            color: '#566bf5',
          }}>
          Room Size : {room?.roomSize}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <IoniconsIcons name="bed" size={24} color={COLORS.primaryColor} />
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
              }}>
              Total Bed {room?.bed}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <FontistoIcon name="person" size={24} color={COLORS.primaryColor} />
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
              }}>
              Adults 4
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <FontAwesomeIcon
              name="child"
              size={24}
              color={COLORS.primaryColor}
            />
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
              }}>
              Children 2
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: FONTS.forgotText,
                fontWeight: WEIGHT.forgotText,
                color: COLORS.primaryColor,
              }}>
              ₹{price} {room?.payment} {room?.refundable}
            </Text>
            <Text
              style={{
                fontSize: FONTS.placeHolder,
                fontWeight: WEIGHT.placeHolder,
                color: COLORS.primaryColor,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Total for 2 nights
            </Text>
          </View>
          <View style={{gap: 5}}>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => {
                const data = {
                  room: room,
                  journeyDates: journeyDates,
                  guests: guests,
                  hotelInfo: hotelInfo,
                  price: price,
                };
                console.log('Add to cart', data);
              }}>
              <Text
                style={{
                  fontSize: FONTS.placeHolder,
                  fontWeight: WEIGHT.placeHolder,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.medium,
                  backgroundColor: COLORS.mainButtonColor,
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => {
                navigation.navigate('FormFill', {
                  type: 'Hotel Booking',
                  data: {
                    room: room,
                    journeyDates: journeyDates,
                    guests: guests,
                    hotelInfo: hotelInfo,
                    price: price,
                  },
                });
              }}>
              <Text
                style={{
                  fontSize: FONTS.placeHolder,
                  fontWeight: WEIGHT.placeHolder,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.medium,
                  backgroundColor: COLORS.mainButtonColor,
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HotelRoomCard;
