import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const PackageBookingForm = ({data, onDeletePressHandler, onBookHandler}) => {
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
          Package Information
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
            source={{uri: data?.packageItem?.packageImage}}
            style={{width: '30%', height: '100%', borderRadius: 7}}
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
              {data?.packageItem?.packageName}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                width: '95%',
                fontSize: FONTS.placeHolder,
                fontWeight: WEIGHT.placeHolder,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}></Text>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.regular,
                color: COLORS.primaryColor,
              }}>
              Starting Date : {data?.date}
            </Text>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.regular,
                color: COLORS.primaryColor,
              }}>
              Ending Date :{' '}
              {`${data?.date.split('-')[0]}-${
                parseInt(data?.date.split('-')[2]) +
                  (parseInt(data?.packageItem?.nights) + 1) >=
                30
                  ? parseInt(data?.date.split('-')[1]) + 1
                  : data?.date.split('-')[1]
              }-${
                parseInt(data?.date.split('-')[2]) +
                  (parseInt(data?.packageItem?.nights) + 1) >=
                30
                  ? parseInt(data?.date.split('-')[2]) +
                    (parseInt(data?.packageItem?.nights) + 1) -
                    (parseInt(data?.date.split('-')[1]) % 2 == 0 ? 30 : 31)
                  : parseInt(data?.date.split('-')[2]) +
                    (parseInt(data?.packageItem?.nights) + 1)
              }`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onDeletePressHandler}
            activeOpacity={0.35}
            style={{alignSelf: 'flex-start'}}>
            <AntDesignIcon name="delete" size={24} color={COLORS.primaryRed} />
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
                parseInt(data?.date.split('-')[2]) - 2 <= 0
                  ? 30
                  : parseInt(data?.date.split('-')[2]) - 2
              }/${
                parseInt(data?.date.split('-')[2]) - 2 <= 0
                  ? data?.date.split('-')[1] - 1 == 0
                    ? 1
                    : data?.date.split('-')[1] - 1
                  : data?.date.split('-')[1]
              }/${
                parseInt(data?.date.split('-')[2]) - 2 <= 0
                  ? data?.date.split('-')[0] - 1
                  : data?.date.split('-')[0]
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

        {/* other details  */}
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
            Other Details
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Hotel : {data?.packageItem?.hotelDetail?.hotelName}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Meal : {data?.packageItem?.hotelDetail?.meal}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Number of Room : {data?.packageItem?.hotelDetail?.rooms}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Package Type : {data?.packageItem?.packageType}
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

export default PackageBookingForm;
