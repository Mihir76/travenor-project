import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
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
import {useStore} from '../../../store';

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
const LogInScreen = () => {
  const {setAuthToken, setUserDetails} = useStore();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const logInHandler = () => {
    if (!email || !password) {
      setIsPressed(false);
      return Alert.alert('Error', 'Please fill all the fields');
    }
    axios
      .post(`${baseUrl}api/v1/user/logIn`, {
        email: email,
        password: password,
      })
      .then(response => {
        if (response.data.success) {
          setIsPressed(false);
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          setAuthToken(response.data.authToken);
          setUserDetails(response.data?.userDetails);
          navigation.replace('Bottom');
          setEmail('');
          setPassword('');
        } else {
          if (response.data.message == 'Please verify your account first') {
            setIsPressed(false);
            return Alert.alert(
              'Verification Required!',
              response.data.message,
              [
                {
                  text: 'Verify',
                  onPress: () => {
                    navigation.navigate('EmailVerification', {email: email});
                    setEmail('');
                    setPassword('');
                  },
                },
              ],
            );
          } else {
            setIsPressed(false);
            return Alert.alert('Error', response.data.message);
          }
        }
      })
      .catch(error => {
        console.log(error);
        setIsPressed(false);
      });
  };

  return (
    <ImageBackground source={require('../../assets/image/background.png')}>
      {/* app-logo */}
      <View style={{height: hp('25%')}} />
      <View
        style={{
          height: hp('75%'),
          backgroundColor: COLORS.primaryColorBlur,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}>
        <View style={{padding: 10}}>
          <Text
            style={{
              letterSpacing: 0.75,
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              color: COLORS.whiteColor,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            LogIn
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
                placeholder="Registered email"
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
            </View>
            <TouchableOpacity
              disabled={isPressed}
              onPress={() => {
                setIsPressed(!isPressed);
                logInHandler();
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
                  Login Now
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* forget-password and sing-up */}
          <View style={{marginTop: 25, gap: 10}}>
            <TouchableOpacity activeOpacity={0.35}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  textAlign: 'right',
                  fontSize: FONTS.forgotText,
                  fontWeight: WEIGHT.forgotText,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.medium,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => navigation.navigate('SingUp')}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  textAlign: 'right',
                  fontSize: FONTS.forgotText,
                  fontWeight: WEIGHT.forgotText,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.bold,
                }}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={options}
            style={{marginTop: 35}}
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
        </View>
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
            User Login
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LogInScreen;
