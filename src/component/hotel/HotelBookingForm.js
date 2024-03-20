import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const deviceWidth = Dimensions.get('window').width;

const HotelBookingForm = ({data, onDeletePressHandler, onBookHandler}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 12,
          borderWidth: 1,
          borderColor: COLORS.primaryBorderColor,
          borderRadius: 7,
          backgroundColor: COLORS.whiteColor,
          gap: 10,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Hotel Information
        </Text>
        <Text
          style={{
            width: '100%',
            backgroundColor: COLORS.primaryBorderColor,
            height: 1.5,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: hp('12%'),
            gap: 5,
          }}>
          <Image
            resizeMode="cover"
            source={{uri: data?.hotelInfo?.hotelImage}}
            style={{
              width: deviceWidth < 400 ? '20%' : '30%',
              height: deviceWidth < 400 ? '70%' : '100%',
              borderRadius: 7,
            }}
          />
          <View style={{flex: 1, alignSelf: 'flex-start', gap: 3}}>
            <Text
              numberOfLines={1}
              style={{
                width: '95%',
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.bold,
                color: COLORS.primaryColor,
              }}>
              {data?.hotelInfo?.hotelName}
            </Text>
            <Text
              numberOfLines={deviceWidth < 400 ? 2 : 3}
              style={{
                width: '95%',
                fontSize: FONTS.placeHolder,
                fontWeight: WEIGHT.placeHolder,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}>
              {data?.hotelInfo?.shortAddress}
            </Text>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.regular,
                color: COLORS.primaryColor,
              }}>
              Check-In Date : {data?.journeyDates?.startDate}
            </Text>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.regular,
                color: COLORS.primaryColor,
              }}>
              Check-Out Date : {data?.journeyDates?.endDate}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onDeletePressHandler}
            activeOpacity={0.35}
            style={{alignSelf: 'flex-start'}}>
            <AntDesignIcon
              name="delete"
              size={deviceWidth < 400 ? 20 : 24}
              color={COLORS.primaryRed}
            />
          </TouchableOpacity>
        </View>
        <View style={{gap: 3}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Guest Details
          </Text>
          <Text
            style={{
              fontSize: FONTS.placeHolder,
              fontWeight: WEIGHT.placeHolder,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {data?.guests?.adults} Adults
          </Text>
          <Text
            style={{
              fontSize: FONTS.placeHolder,
              fontWeight: WEIGHT.placeHolder,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {data?.guests?.children} Children
          </Text>
        </View>
        <Text
          style={{
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            color: COLORS.primaryColor,
          }}>
          Total Amount : ₹{data?.price}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.35}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: COLORS.mainButtonColor,
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <IoniconsIcon
              name="information-circle"
              size={24}
              color={COLORS.whiteColor}
            />
            <Text
              style={{
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                color: COLORS.whiteColor,
              }}>
              Essential Information *
            </Text>
          </TouchableOpacity>
          <View style={{alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                color: COLORS.primaryRed,
              }}>
              Last Date to Cancel
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontSize: FONTS.forgotText,
                fontWeight: WEIGHT.forgotText,
                color: COLORS.blackColor,
              }}>
              {`${
                parseInt(data?.journeyDates?.startDate.split('-')[2]) - 2 <= 0
                  ? 30
                  : parseInt(data?.journeyDates?.startDate.split('-')[2]) - 2
              }/${
                parseInt(data?.journeyDates?.startDate.split('-')[2]) - 2 <= 0
                  ? data?.journeyDates?.startDate.split('-')[1] - 1 == 0
                    ? 1
                    : data?.journeyDates?.startDate.split('-')[1] - 1
                  : data?.journeyDates?.startDate.split('-')[1]
              }/${
                parseInt(data?.journeyDates?.startDate.split('-')[2]) - 2 <= 0
                  ? data?.journeyDates?.startDate.split('-')[0] - 1
                  : data?.journeyDates?.startDate.split('-')[0]
              }`}
            </Text>
          </View>
        </View>

        <Text
          style={{
            width: '100%',
            backgroundColor: COLORS.primaryBorderColor,
            height: 1.5,
          }}
        />

        {/* room details  */}
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            borderRadius: 7,
            padding: 10,
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.whiteColor,
            }}>
            Room Details
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Room Type : {data?.room?.roomName}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Room Size : {data?.room?.roomSize}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Number of Bed : {data?.room?.bed}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Payment : {data?.room?.payment} {data?.room?.refundable}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 10,
          marginTop: 10,
          marginHorizontal: 12,
          elevation: 4,
        }}>
        <TouchableOpacity
          onPress={onBookHandler}
          activeOpacity={0.35}
          style={{
            backgroundColor: COLORS.mainButtonColor,
            paddingVertical: 10,
            borderRadius: 7,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.whiteColor,
            }}>
            Book
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HotelBookingForm;
