import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import Header from '../../component/Root/Header';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import InputForForm from '../../component/Root/InputForForm';
import HotelBookingForm from '../../component/hotel/HotelBookingForm';
import PackageBookingForm from '../../component/package/PackageBookingForm';

const BookingFormScreen = ({route}) => {
  const navigation = useNavigation();
  const formType = route?.params?.type;
  const data = route?.params?.data;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}>
      <Header
        title="Personal Details"
        left={
          <EntypoIcon
            name="chevron-left"
            size={24}
            color={COLORS.primaryColor}
          />
        }
        leftPressHandler={() => navigation.goBack()}
      />

      {/* user's personal information */}
      <View
        style={{
          marginTop: 15,
          marginHorizontal: 12,
          borderWidth: 1,
          borderColor: COLORS.primaryBorderColor,
          padding: 10,
          backgroundColor: COLORS.whiteColor,
          borderRadius: 7,
          gap: 15,
        }}>
        <Text
          style={{
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Contact Person Details
        </Text>
        <KeyboardAvoidingView style={{gap: 8}}>
          <InputForForm
            title="Name"
            value={name}
            setValue={setName}
            placeholder="Enter Your Name"
          />
          <InputForForm
            title="Email"
            value={email}
            setValue={setEmail}
            placeholder="Enter Your Email"
          />
          <InputForForm
            title="Contact Number"
            value={contactNumber}
            setValue={setContactNumber}
            placeholder="Enter Your Contact Number"
            maxLength={10}
            keyboardType="number-pad"
          />
        </KeyboardAvoidingView>
      </View>
      {formType === 'Hotel Booking' ? (
        <HotelBookingForm
          data={data}
          onDeletePressHandler={() => navigation.goBack()}
          onBookHandler={() => {
            if (!name) {
              return Alert.alert('Error', 'Please Fill your Name');
            }
            if (!email) {
              return Alert.alert('Error', 'Please Fill your Email');
            }
            if (!contactNumber) {
              return Alert.alert('Error', 'Please Fill your Contact Number');
            }
            navigation.navigate('BookingSuccessFull');
          }}
        />
      ) : formType === 'Package Booking' ? (
        <PackageBookingForm
          data={data}
          onDeletePressHandler={() => navigation.goBack()}
          onBookHandler={() => {
            if (!name) {
              return Alert.alert('Error', 'Please Fill your Name');
            }
            if (!email) {
              return Alert.alert('Error', 'Please Fill your Email');
            }
            if (!contactNumber) {
              return Alert.alert('Error', 'Please Fill your Contact Number');
            }
            navigation.navigate('BookingSuccessFull');
          }}
        />
      ) : (
        <Text>Neither Hotel Booking nor Package Booking</Text>
      )}
    </ScrollView>
  );
};

export default BookingFormScreen;
