import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../../component/Root/Header';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
const width = Dimensions.get('window').width;
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import HotelRoomCard from '../../component/hotel/HotelRoomCard';

const Facilities = [
  {
    id: 1,
    title: 'Wi-Fi',
  },
  {
    id: 2,
    title: 'Multilingual Staff',
  },
  {
    id: 3,
    title: 'Camping',
  },
  {
    id: 4,
    title: '24-Hour Security',
  },
  {
    id: 5,
    title: 'Smoking Rooms',
  },
  {
    id: 6,
    title: 'Bellboy Service',
  },
  {
    id: 7,
    title: 'Vacation Townhouse',
  },
  {
    id: 8,
    title: 'Smoke Detector',
  },
  {
    id: 9,
    title: 'Late Check-out',
  },
  {
    id: 10,
    title: 'Annexe (s)',
  },
  {
    id: 11,
    title: 'Terrace',
  },
  {
    id: 12,
    title: 'Concierge',
  },
  {
    id: 13,
    title: 'Car Hire',
  },
  {
    id: 14,
    title: 'Newspapers',
  },
  {
    id: 15,
    title: 'Secure Parking',
  },
  {
    id: 16,
    title: 'Luggage Room',
  },
  {
    id: 17,
    title: 'Valet Parking',
  },
  {
    id: 18,
    title: 'Cloth Dryer',
  },
  {
    id: 19,
    title: 'Airport Shuttle',
  },
  {
    id: 20,
    title: 'Single Rooms',
  },
  {
    id: 21,
    title: 'Cruise',
  },
  {
    id: 22,
    title: 'Golf Course',
  },
  {
    id: 23,
    title: 'Bathrobes',
  },
  {
    id: 24,
    title: 'Safe',
  },
];
const HotelDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const hotelItem = route?.params?.hotelItem;
  const guests = route?.params?.guests;
  const journeyDates = route?.params?.journeyDates;

  const [isFacilitiesShown, setIsFacilitiesShown] = useState(false);
  const [isAboutHotelShown, setIsAboutHotelShown] = useState(false);
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: COLORS.backgroundColor}}
      contentContainerStyle={{paddingBottom: 10}}
      showsVerticalScrollIndicator={false}>
      <Header
        title="Hotel details"
        left={
          <EntypoIcon
            name="chevron-left"
            size={24}
            color={COLORS.primaryColor}
          />
        }
        leftPressHandler={() => navigation.goBack()}
      />

      {/* image-slider  */}
      <TouchableOpacity activeOpacity={1}>
        <View style={{marginTop: 10}}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={hotelItem?.hotelOtherImages}
            scrollAnimationDuration={4000}
            renderItem={item => (
              <View
                style={{
                  flex: 1,
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
      {/* hotel-overView  */}
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 12,
          borderWidth: 1.5,
          borderColor: COLORS.primaryBorderColor,
          backgroundColor: COLORS.whiteColor,
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{gap: 3, width: '70%'}}>
          <Text
            numberOfLines={1}
            style={{
              width: '100%',
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.bold,
            }}>
            {hotelItem?.hotelName}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <IoniconsIcon
              name="location-outline"
              size={24}
              color={COLORS.primaryColor}
            />
            <Text
              numberOfLines={1}
              style={{
                width: '100%',
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
                fontFamily: FONT_FAMILY.medium,
              }}>
              {hotelItem?.shortAddress}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
                fontFamily: FONT_FAMILY.medium,
              }}>
              {hotelItem?.rating}
            </Text>
            <IoniconsIcon name="star" size={24} color={COLORS.ratingColor} />
          </View>

          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            {journeyDates?.startDate} to {journeyDates?.endDate}
          </Text>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.medium,
            }}>
            {guests?.adults} Adults {guests?.children} Children
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.35}>
          <Image source={require('../../assets/image/Map.png')} />
        </TouchableOpacity>
      </View>

      {/* facilities and about hotels  */}
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 12,
          height: hp('6%'),
          backgroundColor: COLORS.whiteColor,
          borderRadius: 7,
          padding: 10,
          borderWidth: 1.5,
          borderColor: COLORS.primaryBorderColor,
        }}>
        <TouchableOpacity
          onPress={() => setIsFacilitiesShown(!isFacilitiesShown)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
          activeOpacity={0.35}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Facilities
          </Text>
          <EntypoIcon
            name="chevron-down"
            size={24}
            color={COLORS.primaryColor}
          />
        </TouchableOpacity>

        <Text
          style={{
            height: '90%',
            backgroundColor: COLORS.primaryColorBlur,
            width: wp('0.5%'),
          }}
        />

        <TouchableOpacity
          onPress={() => setIsAboutHotelShown(!isAboutHotelShown)}
          activeOpacity={0.35}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            About hotel
          </Text>
          <EntypoIcon
            name="chevron-down"
            size={24}
            color={COLORS.primaryColor}
          />
        </TouchableOpacity>
      </View>

      {/* available rooms title*/}
      <View
        style={{
          height: hp('5%'),
          backgroundColor: COLORS.primaryColor,
          marginTop: 15,
          marginHorizontal: 12,
          borderRadius: 7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
            color: COLORS.whiteColor,
          }}>
          Available Rooms
        </Text>
      </View>

      {/* rooms */}
      <View style={{marginTop: 10}} />
      {hotelItem?.rooms.map(room => {
        return (
          <View
            key={room?.roomId}
            style={{
              marginTop: 10,
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              padding: 10,
            }}>
            <HotelRoomCard
              room={room}
              journeyDates={journeyDates}
              guests={guests}
              hotelInfo={{
                _id: hotelItem?._id,
                hotelName: hotelItem?.hotelName,
                hotelImage: hotelItem?.hotelImage,
                shortAddress: hotelItem?.shortAddress,
                place: hotelItem?.place,
                rating: hotelItem?.rating,
              }}
            />
          </View>
        );
      })}

      <CustomBottomModal
        isGuestPicker={isFacilitiesShown}
        setIsGuestPicker={setIsFacilitiesShown}
        modalHeight={350}
        onHardwareBackPress={() => setIsFacilitiesShown(!isFacilitiesShown)}
        onTouchOutside={() => setIsFacilitiesShown(!isFacilitiesShown)}
        modalTitle={
          <Header
            title="Facilities"
            leftPressHandler={() => setIsFacilitiesShown(!isFacilitiesShown)}
            left={
              <IoniconsIcon
                name="close"
                size={24}
                color={COLORS.primaryColor}
              />
            }
          />
        }
        modalContent={
          <View
            style={{
              flex: 1,
              marginTop: 10,
              backgroundColor: COLORS.whiteColor,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              borderRadius: 7,
              paddingVertical: 10,
              paddingHorizontal: 8,
            }}>
            <FlatList
              contentContainerStyle={{rowGap: 3}}
              showsVerticalScrollIndicator={false}
              data={Facilities}
              keyExtractor={facility => facility.id}
              numColumns={2}
              renderItem={facility => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      width: '52%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <IoniconsIcon
                      name="checkbox-sharp"
                      size={24}
                      color={COLORS.primaryColor}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '90%',
                        fontSize: FONTS.extraInfo,
                        fontWeight: WEIGHT.extraSmallText,
                        color: COLORS.primaryColor,
                        fontFamily: FONT_FAMILY.medium,
                      }}>
                      {facility.item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        }
      />

      <CustomBottomModal
        isGuestPicker={isAboutHotelShown}
        setIsGuestPicker={setIsAboutHotelShown}
        modalHeight={400}
        onHardwareBackPress={() => setIsAboutHotelShown(!isAboutHotelShown)}
        onTouchOutside={() => setIsAboutHotelShown(!isAboutHotelShown)}
        modalTitle={
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                width: '90%',
                fontSize: FONTS.appTittle,
                fontWeight: WEIGHT.appTittle,
                color: 'black',
              }}>
              {hotelItem?.hotelName}
            </Text>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => setIsAboutHotelShown(!isAboutHotelShown)}
              style={{paddingHorizontal: 4, paddingVertical: 6}}>
              <IoniconsIcon
                name="close"
                size={24}
                color={COLORS.primaryColor}
              />
            </TouchableOpacity>
          </View>
        }
        modalContent={
          <View style={{flex: 1, width: '100%'}}>
            <Text
              style={{
                width: '100%',
                backgroundColor: COLORS.primaryBorderColor,
                height: 2,
              }}
            />

            <View
              style={{
                width: '100%',
                marginTop: 10,
                height: '30%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={{uri: hotelItem?.hotelImage}}
                style={{width: '30%', height: '100%', borderRadius: 7}}
              />
              <View style={{width: '70%', gap: 3}}>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '90%',
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    color: COLORS.primaryColor,
                  }}>
                  {hotelItem?.hotelName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.primaryColor,
                    }}>
                    {hotelItem?.rating}
                  </Text>
                  <AntDesignIcon
                    name="star"
                    size={24}
                    color={COLORS.ratingColor}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <IoniconsIcon
                    name="location-outline"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '90%',
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                      fontFamily: FONT_FAMILY.medium,
                    }}>
                    {hotelItem?.shortAddress}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: '100%', marginTop: 10}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                    }}>
                    Check-In Date
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.blackColor,
                    }}>
                    {journeyDates?.startDate}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                    }}>
                    Check-Out Date
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.blackColor,
                    }}>
                    {journeyDates?.endDate}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <Text
                  style={{
                    marginTop: 10,
                    letterSpacing: 0.75,
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    color: COLORS.primaryColor,
                    fontFamily: FONT_FAMILY.medium,
                  }}>
                  {hotelItem?.hotelInfo}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1}>
                <Text
                  style={{
                    marginTop: 10,
                    letterSpacing: 0.75,
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                    color: COLORS.blackColor,
                    fontFamily: FONT_FAMILY.medium,
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Note :{' '}
                  </Text>
                  If you want to communicate a special request to the
                  hotel,please choose from the options below. We will
                  communicate the selected special request to the hotel however
                  same cannot be guaranteed by Travenor . All special requests
                  are subject to availability at the time of check in and up to
                  the discretion of the hotel.
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        }
      />
    </ScrollView>
  );
};

export default HotelDetailsScreen;
