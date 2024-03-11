import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-reanimated-carousel';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import Header from '../../component/Root/Header';
import {useNavigation} from '@react-navigation/native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
const width = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HotelDetailsShower from '../../component/package/HotelDetailsShower';
const PackageDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const packageItem = route?.params?.packageItem;
  const date = route?.params?.date;
  const guests = route?.params?.guests;
  const price =
    parseInt(packageItem?.packageCost) * guests?.adults +
    (parseInt(packageItem?.packageCost) / 2) * guests?.children;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header
        title="Package details"
        left={
          <EntypoIcon
            name="chevron-left"
            size={24}
            color={COLORS.primaryColor}
          />
        }
        leftPressHandler={() => navigation.goBack()}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
          marginBottom: hp('8%'),
        }}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        {/* image-slider  */}
        <TouchableOpacity activeOpacity={1}>
          <View style={{marginTop: 10}}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={packageItem?.packageOtherImage}
              scrollAnimationDuration={4000}
              renderItem={item => (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: item.item.img}}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              )}
            />
          </View>
        </TouchableOpacity>

        {/* ---------- Package Info---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Package Info
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <FontistoIcon name="clock" size={24} color={COLORS.titleColor} />
            <Text
              style={{
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}>
              <Text style={{color: COLORS.titleColor}}>Duration : </Text>
              {packageItem?.nights} Nights / {parseInt(packageItem?.nights) + 1}{' '}
              Days
            </Text>
          </View>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            <Text style={{color: COLORS.titleColor}}>Date : </Text>
            {date} to{' '}
            {`${date.split('-')[0]}-${
              parseInt(date.split('-')[2]) +
                (parseInt(packageItem?.nights) + 1) >=
              30
                ? parseInt(date.split('-')[1]) + 1
                : date.split('-')[1]
            }-${
              parseInt(date.split('-')[2]) +
                (parseInt(packageItem?.nights) + 1) >=
              30
                ? parseInt(date.split('-')[2]) +
                  (parseInt(packageItem?.nights) + 1) -
                  (parseInt(date.split('-')[1]) % 2 == 0 ? 30 : 31)
                : parseInt(date.split('-')[2]) +
                  (parseInt(packageItem?.nights) + 1)
            }`}
          </Text>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            <Text style={{color: COLORS.titleColor}}>Guest : </Text>
            {guests?.adults} Adults, {guests?.children} Children
          </Text>
        </View>

        {/* ---------- Hotel Details---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Hotel Details
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          <HotelDetailsShower
            title="Hotel Name"
            content={packageItem?.hotelDetail?.hotelName}
          />
          <HotelDetailsShower
            title="Number of Rooms"
            content={packageItem?.hotelDetail?.rooms}
          />
          <HotelDetailsShower
            title="Room Type"
            content={packageItem?.hotelDetail?.roomType}
          />
          <HotelDetailsShower
            title="Meal"
            content={packageItem?.hotelDetail?.meal}
          />

          <HotelDetailsShower
            title="Check-In Date - Check-Out Date"
            content={`${date}  to  ${date.split('-')[0]}-${
              parseInt(date.split('-')[2]) +
                (parseInt(packageItem?.nights) + 1) >=
              30
                ? parseInt(date.split('-')[1]) + 1
                : date.split('-')[1]
            }-${
              parseInt(date.split('-')[2]) +
                (parseInt(packageItem?.nights) + 1) >=
              30
                ? parseInt(date.split('-')[2]) +
                  (parseInt(packageItem?.nights) + 1) -
                  (parseInt(date.split('-')[1]) % 2 == 0 ? 30 : 31)
                : parseInt(date.split('-')[2]) +
                  (parseInt(packageItem?.nights) + 1)
            }`}
          />
        </View>

        {/* ---------- Itinerary Details---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Itinerary Details
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          {packageItem?.tripSchedule?.map((tripSchedule, index) => {
            return (
              <View
                key={tripSchedule?.dayNumber}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderColor: COLORS.primaryBorderColor,
                  borderRadius: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: hp('10%'),
                  }}>
                  <View style={{height: '100%', width: '35%'}}>
                    <Image
                      style={{width: '100%', height: '100%', borderRadius: 7}}
                      source={{uri: packageItem?.packageOtherImage[index].img}}
                    />
                    <Text
                      style={{
                        bottom: '5%',
                        position: 'absolute',
                        alignSelf: 'center',
                        fontSize: FONTS.extraInfo,
                        fontWeight: WEIGHT.extraInfo,
                        backgroundColor: 'rgba(255,255,255,0.45)',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        color: COLORS.blackColor,
                        fontFamily: FONT_FAMILY.medium,
                        borderRadius: 12,
                      }}>
                      Day {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: '60%',
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.titleColor,
                    }}>
                    {tripSchedule?.dayTitle}
                  </Text>
                </View>
                <View style={{marginTop: 5, gap: 2}}>
                  {tripSchedule?.daySchedule.map(dayActivity => {
                    return (
                      <View
                        key={dayActivity?.dayScheduleId}
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                        }}>
                        <View style={{alignSelf: 'flex-start'}}>
                          <EntypoIcon
                            name="dot-single"
                            size={24}
                            color={COLORS.primaryColor}
                          />
                        </View>
                        <Text
                          style={{
                            letterSpacing: 0.75,
                            width: '90%',
                            fontSize: FONTS.placeHolder,
                            fontWeight: WEIGHT.placeHolder,
                            color: COLORS.primaryColor,
                            fontFamily: FONT_FAMILY.medium,
                          }}>
                          {dayActivity?.dayTask}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* ---------- Inclusion---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Inclusion
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Economy class air travel for guests as mentioned in the itinerary.
            Airfare, Airport taxes and Visa Fees Baggage Allowance as per the
            airline policy Tour Manager Services throughout the tour Travel by
            comfortable A/C coach as per the tour itinerary Entrance fees of all
            sightseeing places to be visited from inside Accommodation in
            comfortable and convenient hotels on twin sharing basis All
            Meals-Breakfast, Lunch, Dinner as mentioned in the itinerary.All
            Tips-Guide, Driver & Restaurants Cost of internal airfare as
            mentioned in the itinerary Complimentary insurance up to 59 years of
            age.
          </Text>
        </View>

        {/* ---------- Exclusion---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Exclusion
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Govt Tax of 5% over and above the Tour Cost mentioned TCS(5% or
            10%)is applicable on GST inclusive price for international tour. Any
            increase in Airfare, Visa fees, Airport taxes, Govt Taxes, Fuel
            Surcharges and any applicability of new taxes from Govt Any up
            gradation in Airline class or hotel room category Cost of Air ticket
            deviation charges Any Increase in the rate of exchange leading to an
            increase in all land arrangements which may come in to effect prior
            to departure Cost of pre or post tour hotel accommodation Any extra
            expense such as route change, Airline change, Date change,
            Accommodation facilities, etc incurred due to the unforeseen,
            unavoidable forced majeuere circumstances during the tour
          </Text>
        </View>

        {/* ---------- Additional---------- */}
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 12,
            backgroundColor: COLORS.whiteColor,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 7,
            padding: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Additional
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.primaryBorderColor,
              height: 2,
            }}
          />
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            Discover a new place filled with fascinating culture, amazing
            landscapes, ancient history and really delicious cuisine with your
            selection of this holiday package. Whether you’re up for exploring,
            the breath taking or just a sparkling white sandy beach, you’ll find
            it here.
          </Text>
        </View>

        {/* ------ FAQs ------- */}
        {/* ------ Booking Policy ------- */}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: COLORS.primaryColor,
          width: '100%',
          height: hp('7%'),
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.bold,
            }}>
            Grand Total : ₹{price}
          </Text>
          <EntypoIcon name="chevron-up" size={24} color={COLORS.whiteColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FormFill', {
              type: 'Package Booking',
              data: {
                packageItem: packageItem,
                price: price,
                guests: guests,
                date: date,
              },
            })
          }
          activeOpacity={0.35}
          style={{
            backgroundColor: COLORS.mainButtonColor,
            width: '35%',
            borderRadius: 7,
          }}>
          <Text
            style={{
              letterSpacing: 0.75,
              textAlign: 'center',
              paddingVertical: 10,
              color: COLORS.whiteColor,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
            }}>
            Book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackageDetailScreen;
