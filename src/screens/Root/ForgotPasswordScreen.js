import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../constants/url';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const firstInputRef = useRef();
  const [firstInput, setFirstInput] = useState('');
  const secondInputRef = useRef();
  const [secondInput, setSecondInput] = useState('');
  const thirdInputRef = useRef();
  const [thirdInput, setThirdInput] = useState('');
  const fourthInputRef = useRef();
  const [fourthInput, setFourthInput] = useState('');
  const fifthInputRef = useRef();
  const [fifthInput, setFifthInput] = useState('');
  const sixthInputRef = useRef();
  const [sixthInput, setSixthInput] = useState('');
  const [opt, setOtp] = useState('');
  const passwordRef = useRef();

  useEffect(() => {
    if (
      firstInput &&
      secondInput &&
      thirdInput &&
      fourthInput &&
      fifthInput &&
      sixthInput
    ) {
      let partialOtp = '';
      partialOtp += firstInput;
      partialOtp += secondInput;
      partialOtp += thirdInput;
      partialOtp += fourthInput;
      partialOtp += fifthInput;
      partialOtp += sixthInput;
      setOtp(partialOtp);
    }
  }, [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ]);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      {step == 1 ? (
        <View style={{flex: 1}}>
          <ImageBackground
            imageStyle={{
              opacity: 0.15,
            }}
            source={require('../../assets/image/forgotPassword.png')}
            style={{
              width: deviceWidth,
              height: deviceHeight / 1.25,
              resizeMode: 'cover',
              paddingTop: deviceHeight / 2.95,
              gap: 15,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                fontSize: FONTS.appTittle,
                fontWeight: WEIGHT.appTittle,
                fontFamily: FONT_FAMILY.bold,
                color: COLORS.primaryColor,
              }}>
              Forgot Password
            </Text>
            <TextInput
              placeholder="Enter Your Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                borderWidth: 1,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                paddingVertical: 6,
                width: '95%',
                backgroundColor: COLORS.whiteColor,
                paddingHorizontal: 12,
                color: COLORS.primaryColor,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (!email) {
                  return Alert.alert(
                    'Error',
                    'Please Enter Your Email address',
                  );
                }
                let isValidEmail =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    email,
                  );
                if (!isValidEmail) {
                  return Alert.alert('Error', 'Please Enter a valid Email');
                }
                // call api
                axios
                  .post(`${baseUrl}api/v1/user/forgotPassword`, {email: email})
                  .then(response => {
                    if (response.data.success) {
                      ToastAndroid.show(
                        response.data.message,
                        ToastAndroid.SHORT,
                      );
                      setStep(2);
                    } else {
                      return Alert.alert('Error', response.data.message);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
              activeOpacity={0.35}
              style={{
                backgroundColor: COLORS.mainButtonColor,
                width: '75%',
                paddingVertical: 12,
                borderRadius: 7,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  textAlign: 'center',
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  color: COLORS.whiteColor,
                  fontFamily: FONT_FAMILY.bold,
                }}>
                Send Email
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <ImageBackground
            imageStyle={{
              opacity: 0.15,
            }}
            source={require('../../assets/image/forgotPassword.png')}
            style={{
              width: deviceWidth,
              height: deviceHeight / 1.25,
              resizeMode: 'cover',
              paddingTop: deviceHeight / 2.95,
              gap: 15,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                fontSize: FONTS.appTittle,
                fontWeight: WEIGHT.appTittle,
                fontFamily: FONT_FAMILY.bold,
                color: COLORS.primaryColor,
              }}>
              Reset Password
            </Text>

            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}>
              Verification code
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TextInput
                ref={firstInputRef}
                value={firstInput}
                onChangeText={text => {
                  setFirstInput(text);
                  if (text.length >= 1) {
                    secondInputRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
              <TextInput
                ref={secondInputRef}
                value={secondInput}
                onChangeText={text => {
                  setSecondInput(text);
                  if (text.length >= 1) {
                    thirdInputRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
              <TextInput
                ref={thirdInputRef}
                value={thirdInput}
                onChangeText={text => {
                  setThirdInput(text);
                  if (text.length >= 1) {
                    fourthInputRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
              <TextInput
                ref={fourthInputRef}
                value={fourthInput}
                onChangeText={text => {
                  setFourthInput(text);
                  if (text.length >= 1) {
                    fifthInputRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
              <TextInput
                ref={fifthInputRef}
                value={fifthInput}
                onChangeText={text => {
                  setFifthInput(text);
                  if (text.length >= 1) {
                    sixthInputRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
              <TextInput
                ref={sixthInputRef}
                value={sixthInput}
                onChangeText={text => {
                  setSixthInput(text);
                  if (text.length >= 1) {
                    passwordRef.current.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: COLORS.whiteColor,
                  height: 55,
                  textAlign: 'center',
                  borderRadius: 12,
                  borderColor: COLORS.primaryBorderColor,
                  borderWidth: 1,
                  width: 55,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}>
              New Password
            </Text>
            <TextInput
              placeholder="Enter Your New Password"
              value={password}
              ref={passwordRef}
              onChangeText={text => setPassword(text)}
              style={{
                borderWidth: 1,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                paddingVertical: 6,
                width: '95%',
                backgroundColor: COLORS.whiteColor,
                paddingHorizontal: 12,
                color: COLORS.primaryColor,
              }}
            />

            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                fontFamily: FONT_FAMILY.medium,
                color: COLORS.primaryColor,
              }}>
              Confirm Password
            </Text>
            <TextInput
              placeholder="Confirm Your New Password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={true}
              style={{
                borderWidth: 1,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                paddingVertical: 6,
                width: '95%',
                backgroundColor: COLORS.whiteColor,
                paddingHorizontal: 12,
                color: COLORS.primaryColor,
              }}
            />
            <TouchableOpacity
              disabled={opt.length == 6 ? false : true}
              onPress={() => {
                if (!password || !confirmPassword) {
                  return Alert.alert(
                    'Error',
                    'Please provide essential information',
                  );
                }
                if (password != confirmPassword) {
                  return Alert.alert(
                    'Error',
                    'New password and confirm password do not match!',
                  );
                }

                //   call api
                axios
                  .post(`${baseUrl}api/v1/user/forgotPasswordReset`, {
                    email: email,
                    verificationCode: opt,
                    password: password,
                  })
                  .then(response => {
                    if (response.data.success) {
                      ToastAndroid.show(
                        response.data.message,
                        ToastAndroid.SHORT,
                      );
                      navigation.navigate('LogIn');
                    } else {
                      return Alert.alert('Error', response.data.message, [
                        {
                          text: 'OK',
                          onPress: () => {
                            setFirstInput('');
                            setSecondInput('');
                            setThirdInput('');
                            setFourthInput('');
                            setFifthInput('');
                            setSixthInput('');
                            setOtp('');
                          },
                        },
                      ]);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
              activeOpacity={0.35}
              style={{
                backgroundColor:
                  opt.length == 6 ? COLORS.mainButtonColor : '#e0ef5a9d',
                width: '75%',
                paddingVertical: 12,
                borderRadius: 7,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  textAlign: 'center',
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  color: opt.length == 6 ? COLORS.whiteColor : '#6c6a6a',
                  fontFamily: FONT_FAMILY.bold,
                }}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;
