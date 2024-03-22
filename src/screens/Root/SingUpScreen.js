import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import InputFields from '../../component/Root/InputFields';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../constants/url';

const deviceHeight = Dimensions.get('window').height;
const options = [
  {
    id: 1,
    title: 'Lots of Choices',
    subTitle: 'There are many choices of trips and interesting events in it.',
    image: require('../../assets/image/option.png'),
  },
  {
    id: 2,
    title: 'Professional Guide',
    subTitle:
      'While on a vacation you will be guided by our professional guide.',
    image: require('../../assets/image/guide.jpg'),
  },
  {
    id: 3,
    title: 'Secure booking Engine',
    subTitle:
      'Your data will be securely stored and provides you confidentiality.',
    image: require('../../assets/image/secure.jpg'),
  },
];

const SingUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isPressed, setIsPressed] = useState(false);
  return (
    <ImageBackground source={require('../../assets/image/background.png')}>
      {/* app-logo */}
      <View style={{height: deviceHeight < 800 ? hp('25%') : hp('30%')}} />
      <View
        style={{
          height: deviceHeight < 800 ? hp('75%') : hp('70%'),
          backgroundColor: COLORS.primaryColorBlur,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}>
        <ScrollView style={{padding: 10}}>
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              color: COLORS.whiteColor,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            SingUp
          </Text>

          {/* email-password-logIn button  */}
          <View
            style={{
              backgroundColor: COLORS.whiteColor,
              marginTop: 25,
              borderRadius: 7,
              overflow: 'hidden',
            }}>
            <View style={{paddingHorizontal: 10}}>
              <InputFields
                data={email}
                setData={setEmail}
                secureTextEntry={false}
                icon={
                  <FontAwesomeIcon name="user" size={24} color={'#8b8a8aae'} />
                }
                placeholder="Your email"
              />
              <Text style={{backgroundColor: '#17171761', height: 1}} />
              <InputFields
                data={password}
                setData={setPassword}
                secureTextEntry={isPasswordVisible ? false : true}
                icon={
                  <SimpleLineIcons name="lock" size={24} color={'#8b8a8aae'} />
                }
                placeholder="Password"
                eyeIcon={
                  isPasswordVisible ? (
                    <FeatherIcon name="eye-off" size={24} color={'#8b8a8aae'} />
                  ) : (
                    <FeatherIcon name="eye" size={24} color={'#8b8a8aae'} />
                  )
                }
                onEyePressHandler={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
              />
              <Text style={{backgroundColor: '#17171761', height: 1}} />
              <InputFields
                data={confirmPassword}
                setData={setConfirmPassword}
                secureTextEntry={isConfirmPasswordVisible ? false : true}
                icon={
                  <SimpleLineIcons name="lock" size={24} color={'#8b8a8aae'} />
                }
                placeholder="Confirm Password"
                eyeIcon={
                  isConfirmPasswordVisible ? (
                    <FeatherIcon name="eye-off" size={24} color={'#8b8a8aae'} />
                  ) : (
                    <FeatherIcon name="eye" size={24} color={'#8b8a8aae'} />
                  )
                }
                onEyePressHandler={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              />
            </View>
            <TouchableOpacity
              disabled={isPressed}
              onPress={() => {
                if (!email || !password || !confirmPassword) {
                  return Alert.alert(
                    'Error',
                    'Please provide essential information',
                  );
                }

                // check for strong password
                if (password.length < 5) {
                  return Alert.alert(
                    'Error',
                    'Password must be at least 6 characters and it must contain special character (e.g. @ or #)',
                  );
                }

                // check if password match or not
                if (password !== confirmPassword) {
                  return Alert.alert(
                    'Error',
                    'Password and confirm password do not match',
                  );
                }
                // call sing up api
                setIsPressed(true);
                axios
                  .post(`${baseUrl}api/v1/user/singUp`, {
                    email: email,
                    password: password,
                  })
                  .then(response => {
                    setIsPressed(false);
                    if (response.data.success) {
                      ToastAndroid.show(
                        response.data.message,
                        ToastAndroid.SHORT,
                      );
                      navigation.navigate('EmailVerification', {email: email});
                    } else {
                      console.log(response.data?.error);
                      return Alert.alert('Error', response.data.message);
                    }
                  })
                  .catch(error => {
                    setIsPressed(false);
                    console.log(error);
                  });
              }}
              style={{
                backgroundColor: isPressed
                  ? '#f4f4127a'
                  : COLORS.mainButtonColor,
              }}
              activeOpacity={0.35}>
              {isPressed ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 14,
                      textAlign: 'center',
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.blackColor,
                      fontFamily: FONT_FAMILY.bold,
                      letterSpacing: 0.5,
                    }}>
                    Please Wait...
                  </Text>
                  <ActivityIndicator color={COLORS.blackColor} />
                </View>
              ) : (
                <Text
                  style={{
                    paddingVertical: 14,
                    textAlign: 'center',
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    color: COLORS.whiteColor,
                    fontFamily: FONT_FAMILY.bold,
                    letterSpacing: 0.5,
                  }}>
                  Sing-Up Now
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Log-in */}
          <View style={{marginTop: 25, gap: 10}}>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => navigation.navigate('LogIn')}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  textAlign: 'right',
                  fontSize: FONTS.forgotText,
                  fontWeight: WEIGHT.forgotText,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.bold,
                }}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={options}
            style={{marginTop: 20}}
            keyExtractor={optionData => optionData.id}
            contentContainerStyle={{columnGap: 15}}
            renderItem={optionData => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    height: hp('17.5%'),
                    width: wp('55%'),
                    borderRadius: 7,
                    borderColor: COLORS.primaryBorderColor,
                    borderWidth: 1,
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <Image
                    source={optionData.item.image}
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      borderColor: COLORS.primaryBorderColor,
                      borderWidth: 1,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                      textAlign: 'center',
                    }}>
                    {optionData?.item?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTS.placeHolder,
                      fontWeight: WEIGHT.placeHolder,
                      color: COLORS.blackColor,
                      textAlign: 'center',
                    }}>
                    {optionData?.item?.subTitle}
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: COLORS.primaryColor,
            paddingVertical: 12,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <Text
            style={{
              letterSpacing: 0.75,
              textAlign: 'center',
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              color: COLORS.whiteColor,
            }}>
            New User Registration
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SingUpScreen;
