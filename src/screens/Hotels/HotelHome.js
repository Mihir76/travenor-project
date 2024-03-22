import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import InputField from '../../component/hotel/InputField';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Modal, ModalContent} from 'react-native-modals';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {baseUrl} from '../../constants/url';
import ErrorLoading from '../../component/Loading/ErrorLoading';

const HotelHome = () => {
  const [topDestination, setTopDestination] = useState([]);
  const [isTopDestinationLoaded, setIsTopDestinationLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}api/v1/hotels/hotelCount`)
      .then(response => {
        setTopDestination(response.data?.hotelCount);
        setIsTopDestinationLoaded(true);
      })
      .catch(error => {
        console.log(error);
        setIsTopDestinationLoaded(true);
      });
  }, []);

  const [popularHotel, setPopularHotel] = useState([]);
  const [isPopularHotelLoaded, setIsPopularHotelLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}api/v1/hotels/popularHotel`)
      .then(response => {
        setPopularHotel(response.data?.popularHotels);
        setIsPopularHotelLoaded(true);
      })
      .catch(error => {
        console.log(error);
        setIsPopularHotelLoaded(true);
      });
  }, []);

  const navigation = useNavigation();
  const [destination, setDestination] = useState('');
  const [journeyDates, setJourneyDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
  });

  const updateDestination = newDestination => {
    setDestination(newDestination);
  };
  const [isGuestPicker, setIsGuestPicker] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  // calendar-picker helper
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const datePickedHandler = () => {
    if (journeyDates.startDate && journeyDates.endDate) {
      if (journeyDates.startDate <= journeyDates.endDate) {
        setIsDatePicker(false);
      } else {
        setJourneyDates({
          ...journeyDates,
          startDate: '',
          endDate: '',
        });

        return Alert.alert(
          'Invalid Dates',
          'Check-In date must be lesser than Check-Out date',
        );
      }
    } else {
      if (!journeyDates.startDate && !journeyDates.endDate) {
        return Alert.alert(
          'Select Check-In and Check-Out Dates',
          'Check-In and Check-Out dates must be provided in-order to proceed further',
        );
      } else if (!journeyDates.startDate) {
        return Alert.alert(
          'Select Check-In Date',
          'Check-In date must be provided in-order to proceed further',
        );
      } else {
        return Alert.alert(
          'Select Check-Out Date',
          'Check-Out date must be provided in-order to proceed further',
        );
      }
    }
  };

  const HotelSearchHandler = () => {
    if (!destination) {
      return Alert.alert(
        'Select Destination',
        'Destination must be provided in-order to proceed further',
      );
    }

    if (!journeyDates.startDate || !journeyDates.endDate) {
      return Alert.alert(
        'Select Check-In and Check-Out Dates',
        'Check-In and Check-Out dates must be provided in-order to proceed further',
      );
    }
    navigation.navigate('HotelSearchResult', {
      location: destination,
      journeyDates: journeyDates,
      guests: guests,
    });
  };

  return (
    <>
      <ScrollView style={{margin: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.whiteColor,
            marginTop: 15,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
            borderRadius: 10,
          }}>
          <InputField
            onPress={() =>
              navigation.navigate('HotelDestination', {
                updateDestination: updateDestination,
              })
            }
            title="Where are you going?"
            icon={
              <FontAwesome6Icon
                name="location-dot"
                size={24}
                color={COLORS.primaryColor}
              />
            }
            value={
              destination.length > 1 ? (
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                  }}>
                  {destination}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                  }}>
                  Select your Destination
                </Text>
              )
            }
          />
          <InputField
            title="Check in - Check out"
            icon={
              <FontAwesome6Icon
                name="calendar-days"
                size={24}
                color={COLORS.primaryColor}
              />
            }
            onPress={() => {
              setIsDatePicker(true);
            }}
            value={
              journeyDates.startDate && journeyDates.endDate ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                    }}>
                    {journeyDates.startDate}
                  </Text>
                  <FontAwesome6Icon
                    name="circle-arrow-right"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                    }}>
                    {journeyDates.endDate}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                  }}>
                  Choose Your Journey Dates
                </Text>
              )
            }
          />
          <InputField
            title="Guests"
            icon={
              <FontAwesome6Icon
                name="user"
                size={24}
                color={COLORS.primaryColor}
              />
            }
            value={
              <Text
                style={{
                  fontSize: FONTS.mediumText,
                  fontWeight: WEIGHT.mediumText,
                }}>
                {guests.adults} Adults,{'  '}
                {guests.children} Children
              </Text>
            }
            onPress={() => setIsGuestPicker(!isGuestPicker)}
          />

          <TouchableOpacity
            onPress={HotelSearchHandler}
            activeOpacity={0.35}
            style={{
              backgroundColor: COLORS.mainButtonColor,
              marginTop: 15,
              paddingVertical: 12,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.whiteColor,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Search Your Hotel
            </Text>
          </TouchableOpacity>
        </View>

        {/* top destinations */}
        <View
          style={{
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Top Destinations
          </Text>
          {isTopDestinationLoaded && topDestination.length > 0 ? (
            <FlatList
              style={{marginVertical: 15}}
              contentContainerStyle={{gap: 10}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={topDestination}
              keyExtractor={topDestination => topDestination?.place}
              renderItem={topDestination => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: COLORS.whiteColor,
                      borderWidth: 1,
                      borderColor: COLORS.primaryBorderColor,
                      borderRadius: 12,
                      overflow: 'hidden',
                      gap: 3,
                      paddingBottom: 4,
                    }}>
                    <Image
                      source={{uri: topDestination.item?.image}}
                      style={{
                        width: wp('40%'),
                        height: hp('20%'),
                        resizeMode: 'cover',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: FONTS.extraInfo,
                        fontWeight: WEIGHT.extraInfo,
                        fontFamily: FONT_FAMILY.medium,
                        color: COLORS.primaryColor,
                        textAlign: 'center',
                      }}>
                      {topDestination.item?.place}
                    </Text>
                    <Text
                      style={{
                        fontSize: FONTS.mediumText,
                        fontWeight: WEIGHT.mediumText,
                        fontFamily: FONT_FAMILY.regular,
                        color: COLORS.blackColor,
                        textAlign: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.bold,
                          color: COLORS.primaryColor,
                        }}>
                        {topDestination.item?.count}{' '}
                      </Text>
                      Hotels
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : isTopDestinationLoaded && topDestination.length == 0 ? (
            <View
              style={{
                marginVertical: 25,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                No data found!
              </Text>
            </View>
          ) : (
            <View style={{marginVertical: 25}}>
              <ErrorLoading />
            </View>
          )}
        </View>

        {/* popular hotels */}
        <View
          style={{
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Popular Hotels
          </Text>

          {isPopularHotelLoaded && popularHotel.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 15}}
              contentContainerStyle={{gap: 10}}
              data={popularHotel}
              keyExtractor={popularHotel => popularHotel?._id}
              renderItem={popularHotelDetail => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: COLORS.whiteColor,
                      borderWidth: 1,
                      borderColor: COLORS.primaryBorderColor,
                      borderRadius: 12,
                      overflow: 'hidden',
                      gap: 3,
                      paddingBottom: 4,
                    }}>
                    <Image
                      style={{
                        width: wp('45%'),
                        height: hp('23%'),
                        resizeMode: 'cover',
                      }}
                      source={{uri: popularHotelDetail?.item?.hotelImage}}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: FONTS.extraInfo,
                        fontWeight: WEIGHT.extraInfo,
                        fontFamily: FONT_FAMILY.medium,
                        color: COLORS.primaryColor,
                        textAlign: 'center',
                        width: wp('45%'),
                      }}>
                      {popularHotelDetail?.item?.hotelName}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: FONTS.mediumText,
                        fontWeight: WEIGHT.mediumText,
                        fontFamily: FONT_FAMILY.regular,
                        color: COLORS.blackColor,
                        textAlign: 'center',
                        width: wp('45%'),
                      }}>
                      Location{' '}
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.bold,
                          color: COLORS.primaryColor,
                        }}>
                        {popularHotelDetail?.item?.place}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : isPopularHotelLoaded && popularHotel.length == 0 ? (
            <View
              style={{
                marginVertical: 25,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                No data found!
              </Text>
            </View>
          ) : (
            <View style={{marginVertical: 25}}>
              <ErrorLoading />
            </View>
          )}
        </View>
      </ScrollView>
      <CustomBottomModal
        isGuestPicker={isGuestPicker}
        setIsGuestPicker={setIsGuestPicker}
        modalContent={
          <>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontWeight: WEIGHT.appTittle,
                fontSize: FONTS.appTittle,
                color: COLORS.primaryColor,
              }}>
              Select the Guests
            </Text>

            {/* ---------adults-------  */}
            <View
              style={{
                marginTop: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                }}>
                Adults
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <TouchableOpacity
                  activeOpacity={0.35}
                  onPress={() =>
                    setGuests({
                      ...guests,
                      adults: Math.max(1, guests.adults - 1),
                    })
                  }>
                  <AntDesignIcons
                    name="minuscircleo"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                    fontFamily: FONT_FAMILY.bold,
                  }}>
                  {guests.adults}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.35}
                  onPress={() =>
                    setGuests({
                      ...guests,
                      adults: Math.min(4, guests.adults + 1),
                    })
                  }>
                  <AntDesignIcons
                    name="pluscircleo"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* ---------children------- */}
            <View
              style={{
                marginTop: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                }}>
                Children
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <TouchableOpacity
                  activeOpacity={0.35}
                  onPress={() =>
                    setGuests({
                      ...guests,
                      children: Math.max(0, guests.children - 1),
                    })
                  }>
                  <AntDesignIcons
                    name="minuscircleo"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                    fontFamily: FONT_FAMILY.bold,
                  }}>
                  {guests.children}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.35}
                  onPress={() =>
                    setGuests({
                      ...guests,
                      children: Math.min(2, guests.children + 1),
                    })
                  }>
                  <AntDesignIcons
                    name="pluscircleo"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* done button  */}
            <TouchableOpacity
              onPress={() => setIsGuestPicker(!isGuestPicker)}
              activeOpacity={0.35}
              style={{
                backgroundColor: COLORS.mainButtonColor,
                position: 'absolute',
                bottom: '15%',
                left: '35%',
                right: '35%',
                paddingVertical: 12,
                borderRadius: 7,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.whiteColor,
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </>
        }
        modalHeight={250}
        onTouchOutside={() => setIsGuestPicker(!isGuestPicker)}
        onHardwareBackPress={() => setIsGuestPicker(!isGuestPicker)}
      />
      <Modal
        visible={isDatePicker}
        onHardwareBackPress={datePickedHandler}
        onTouchOutside={datePickedHandler}>
        <ModalContent style={{width: wp('90%'), height: hp('80%')}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Check-In and Check-Out Dates
          </Text>
          <Calendar
            style={{marginTop: 20, borderRadius: 7}}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: COLORS.backgroundColor,
              selectedDayBackgroundColor: COLORS.primaryColor,
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#2d4150',
              dayTextColor: '#2d4150',
            }}
            minDate={Date()}
            markedDates={
              journeyDates.startDate || journeyDates.endDate
                ? {
                    [journeyDates.startDate]: {
                      selected: true,
                      marked: true,
                      dotColor: 'transparent',
                    },
                    [journeyDates.endDate]: {
                      selected: true,
                      marked: true,
                      dotColor: 'transparent',
                    },
                  }
                : null
            }
            hideExtraDays
            onDayPress={day => {
              if (!isStartDatePicked) {
                setJourneyDates({startDate: day.dateString});
                setIsStartDatePicked(true);
              } else {
                setJourneyDates({...journeyDates, endDate: day.dateString});
                setIsStartDatePicked(false);
              }
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setJourneyDates({...journeyDates, startDate: '', endDate: ''});
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: 15,
            }}>
            <Text
              style={{
                padding: 5,
                textAlign: 'right',
                backgroundColor: COLORS.mainButtonColor,
                borderRadius: 7,
                color: COLORS.whiteColor,
                fontSize: FONTS.forgotText,
                fontWeight: WEIGHT.forgotText,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Clear
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              gap: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Check-In Date :{' '}
              <Text style={{color: COLORS.primaryColor}}>
                {journeyDates.startDate}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Check-Out Date :{' '}
              <Text style={{color: COLORS.primaryColor}}>
                {journeyDates.endDate}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.35}
            onPress={datePickedHandler}
            style={{
              backgroundColor: COLORS.mainButtonColor,
              paddingVertical: 12,
              borderRadius: 7,
              position: 'absolute',
              bottom: '2%',
              left: '35%',
              right: '35%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.whiteColor,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.medium,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HotelHome;
