import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
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

const PackageHome = () => {
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
  });
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [isGuestPicker, setIsGuestPicker] = useState(false);
  const [date, setDate] = useState('');
  const navigation = useNavigation();
  const onDatePickedHandler = () => {
    if (!date.length > 0) {
      return Alert.alert(
        'Error',
        'Please select Your Date in order to proceed further',
      );
    }
    setIsDatePicker(!isDatePicker);
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
            title="Select Your Date"
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
              date.length > 0 ? (
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
                    {date}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: FONTS.mediumText,
                    fontWeight: WEIGHT.mediumText,
                  }}>
                  Choose Your Date
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
            onPress={() => {
              if (!date.length > 0) {
                return Alert.alert(
                  'Error',
                  'Please Select Your Date in order to proceed further',
                );
              }
              navigation.navigate('PackageSearch', {
                date: date,
                guests: guests,
              });
            }}
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
              Search Packages
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
        onTouchOutside={() => setIsGuestPicker(!isGuestPicker)}
        onHardwareBackPress={() => setIsGuestPicker(!isGuestPicker)}
      />
      <Modal
        visible={isDatePicker}
        onHardwareBackPress={onDatePickedHandler}
        onTouchOutside={onDatePickedHandler}>
        <ModalContent style={{width: wp('90%'), height: hp('80%')}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Select Your Date
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
              date.length > 0
                ? {
                    [date]: {
                      selected: true,
                      marked: true,
                      dotColor: 'transparent',
                    },
                  }
                : null
            }
            hideExtraDays
            onDayPress={day => {
              setDate(day.dateString);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setDate('');
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
              Your Date :{' '}
              <Text style={{color: COLORS.primaryColor}}>{date}</Text>
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.35}
            onPress={onDatePickedHandler}
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

export default PackageHome;
