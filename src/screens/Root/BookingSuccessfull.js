import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const BookingSuccessfull = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Bottom');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingTop: hp('20%'),
      }}>
      <LottieView
        source={require('../../animation/thumbs.json')}
        style={{
          height: hp('30%'),
          width: wp('80%'),
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
      <Text
        style={{
          fontSize: FONTS.appTittle,
          fontWeight: WEIGHT.appTittle,
          color: COLORS.primaryColor,
          textAlign: 'center',
        }}>
        Your Booking has been Confirmed!
      </Text>
      <LottieView
        source={require('../../animation/sparkle.json')}
        style={{
          height: hp('35%'),
          position: 'absolute',
          top: hp('25%'),
          width: wp('70%'),
          alignSelf: 'center',
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
    </View>
  );
};

export default BookingSuccessfull;
