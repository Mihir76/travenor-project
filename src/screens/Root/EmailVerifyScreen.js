import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import axios from 'axios';
import {baseUrl} from '../../constants/url';
import {useNavigation} from '@react-navigation/native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const EmailVerifyScreen = ({route}) => {
  const navigation = useNavigation();
  const email = route?.params?.email;
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
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
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

  // interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        if (timer == 0) {
          setIsTimerRunning(false);
          setTimer(60);
          clearInterval(interval);
        } else {
          setTimer(timer - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        gap: deviceHeight < 800 ? 30 : 45,
      }}>
      <Image
        source={require('../../assets/image/emailVerify.png')}
        style={{
          width: deviceWidth,
          height: deviceHeight / 2.5,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: FONTS.appTittle,
          fontWeight: WEIGHT.appTittle,
          color: COLORS.blackColor,
          fontFamily: FONT_FAMILY.bold,
        }}>
        Verification Code
      </Text>
      <Text
        style={{
          width: '75%',
          textAlign: 'center',
          fontSize: FONTS.mediumText,
          fontWeight: WEIGHT.mediumText,
          color: COLORS.blackColor,
          fontFamily: FONT_FAMILY.medium,
        }}>
        Please Enter Verification Code which you received in your Email
      </Text>
      <KeyboardAvoidingView
        style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              Keyboard.dismiss();
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
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          axios
            .post(`${baseUrl}api/v1/user/verifyEmail`, {
              email: email,
              verificationCode: opt,
            })
            .then(response => {
              if (response.data.success) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                navigation.navigate('LogIn');
              } else {
                return Alert.alert('Error', response.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }}
        disabled={opt.length == 6 ? false : true}
        activeOpacity={0.35}
        style={{
          backgroundColor:
            opt.length == 6 ? COLORS.mainButtonColor : '#e0ef5a9d',
          width: '80%',
          paddingVertical: 12,
          borderRadius: 7,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.extraInfo,
            color: opt.length == 6 ? COLORS.whiteColor : '#6c6a6a',
            fontFamily: FONT_FAMILY.medium,
          }}>
          Verify Code
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
        <Text
          style={{
            letterSpacing: 0.5,
            fontSize: FONTS.placeHolder,
            fontWeight: WEIGHT.placeHolder,
            color: COLORS.blackColor,
            fontFamily: FONT_FAMILY.medium,
          }}>
          Didn't receive code?
        </Text>
        {isTimerRunning ? (
          <Text
            style={{
              letterSpacing: 0.15,
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              color: COLORS.blackColor,
            }}>
            {timer} Seconds
          </Text>
        ) : (
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={() => {
              setIsTimerRunning(true);
              axios
                .post(`${baseUrl}api/v1/user/resendVerificationCode`, {
                  email: email,
                })
                .then(response => {
                  if (response.data.success) {
                    ToastAndroid.show(
                      response.data.message,
                      ToastAndroid.SHORT,
                    );
                  } else {
                    return Alert.alert('Error', response.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }}>
            <Text
              style={{
                letterSpacing: 0.5,
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.primaryColor,
              }}>
              Resend
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EmailVerifyScreen;
