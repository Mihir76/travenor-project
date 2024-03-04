import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import InputField from '../../component/hotel/InputField';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const HotelHome = () => {
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
            title="Destination"
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
            title="Journey Dates"
            icon={
              <FontAwesome6Icon
                name="calendar-days"
                size={24}
                color={COLORS.primaryColor}
              />
            }
            onPress={() =>
              setJourneyDates({
                ...journeyDates,
                startDate: '12/04/2024',
                endDate: '14/04/2021',
              })
            }
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
                  Select Your Journey Dates
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
              Search
            </Text>
          </TouchableOpacity>
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
      />
    </>
  );
};

export default HotelHome;
