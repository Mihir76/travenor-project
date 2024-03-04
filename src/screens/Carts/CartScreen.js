import {Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import LottieView from 'lottie-react-native';
import Header from '../../component/Root/Header';
import {useNavigation} from '@react-navigation/native';
const deviceWidth = Dimensions.get('window').width;

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header
        title="Cart"
        left={<Image source={require('../../assets/image/back.png')} />}
        leftPressHandler={() => {
          navigation.goBack();
        }}
      />
      <View>
        <LottieView
          source={require('../../animation/cart.json')}
          style={{
            width: deviceWidth,
            height: 400,
            marginTop: 35,
          }}
          autoPlay
          loop={false}
        />
        <Text
          style={{
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
            marginTop: 45,
            textAlign: 'center',
          }}>
          Empty Cart
        </Text>
      </View>
    </View>
  );
};

export default CartScreen;
