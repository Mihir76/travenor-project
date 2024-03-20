import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../../../store';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../component/Root/Header';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import InputFields from '../../component/Root/InputFields';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import {baseUrl} from '../../constants/url';

const AccountScreen = () => {
  const navigation = useNavigation();
  const {authToken, userDetails, setUserDetails, setAuthToken} = useStore();
  const [loginShowModal, setLoginShowModal] = useState(false);
  const isFocused = useIsFocused();
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  useEffect(() => {
    if (authToken.length == 0 && isFocused) setLoginShowModal(true);
  }, [isFocused, authToken]);

  const onClosePasswordResetModal = () => {
    setIsPasswordReset(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsCurrentPasswordVisible(true);
    setIsNewPasswordVisible(false);
    setIsConfirmNewPasswordVisible(false);
  };

  const onLogOutHandler = () => {
    setAuthToken('');
    setUserDetails({});
    ToastAndroid.show('Log Out successfully', ToastAndroid.SHORT);
    navigation.replace('Bottom');
  };

  const onPasswordResetHandler = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return Alert.alert('Error', 'Please provide all essential information');
    }

    if (newPassword == currentPassword) {
      return Alert.alert(
        'Error',
        'New password cannot be same as current password',
      );
    }
    const isContainAt = newPassword.includes('@');
    const isContainHash = newPassword.includes('#');

    if (newPassword.length < 6 && (isContainAt || isContainHash)) {
      return Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters and it must have any special symbol (e.g. @ or #)',
      );
    }
    if (newPassword != confirmNewPassword) {
      return Alert.alert(
        'Error',
        'New password and confirm password do not match',
      );
    }

    // call api
    axios
      .post(`${baseUrl}api/v1/user/resetPassword`, {
        email: userDetails?.email,
        currentPassword: currentPassword,
        NewPassword: newPassword,
      })
      .then(response => {
        if (response.data.success) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          onClosePasswordResetModal();
        } else {
          return Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => {
        return Alert.alert('Error', error.message);
      });
  };
  return (
    <KeyboardAvoidingView
      style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      {authToken.length > 0 ? (
        <View>
          <View
            style={{
              backgroundColor: COLORS.whiteColor,
              height: 200,
              width: '100%',
              elevation: 4,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 15,
            }}>
            <Image
              source={{
                uri: userDetails?.profilePicture
                  ? userDetails?.profilePicture
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                borderRadius: 999,
              }}
            />
            {isFocused && userDetails?.name.length == 0 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('CompleteProfile')}
                activeOpacity={0.35}
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.mainButtonColor,
                  width: '45%',
                  paddingVertical: 12,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.forgotText,
                    color: COLORS.whiteColor,
                    fontFamily: FONT_FAMILY.bold,
                  }}>
                  Complete Profile
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    fontFamily: FONT_FAMILY.medium,
                    color: COLORS.blackColor,
                  }}>
                  Hello,
                  <Text
                    style={{
                      color: COLORS.primaryGreen,
                      fontFamily: FONT_FAMILY.bold,
                    }}>
                    {userDetails?.name}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    fontFamily: FONT_FAMILY.medium,
                    color: COLORS.blackColor,
                  }}>
                  Status :{' '}
                  <Text
                    style={{
                      color: COLORS.primaryGreen,
                      fontFamily: FONT_FAMILY.bold,
                    }}>
                    Active
                  </Text>
                </Text>
              </>
            )}
          </View>

          <View
            style={{
              marginTop: '10%',
              marginHorizontal: 12,
              gap: 15,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 14,
              borderRadius: 7,
              borderColor: COLORS.primaryBorderColor,
              backgroundColor: COLORS.whiteColor,
            }}>
            <TouchableOpacity
              activeOpacity={0.35}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: COLORS.backgroundColor,
                padding: 10,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                borderWidth: 1,
              }}>
              <FontAwesome5Icon
                name="user"
                size={24}
                color={COLORS.primaryColor}
              />
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                My Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsPasswordReset(true)}
              activeOpacity={0.35}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: COLORS.backgroundColor,
                padding: 10,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                borderWidth: 1,
              }}>
              <FontAwesome5Icon
                name="lock"
                size={24}
                color={COLORS.primaryColor}
              />
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                Update Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.35}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                backgroundColor: COLORS.backgroundColor,
                padding: 10,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                borderWidth: 1,
              }}>
              <MaterialIcons
                name="support-agent"
                size={24}
                color={COLORS.primaryColor}
              />
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                Support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onLogOutHandler}
              activeOpacity={0.35}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                backgroundColor: COLORS.backgroundColor,
                padding: 10,
                borderRadius: 7,
                borderColor: COLORS.primaryBorderColor,
                borderWidth: 1,
              }}>
              <EntypoIcon
                name="log-out"
                size={24}
                color={COLORS.primaryColor}
              />
              <Text
                style={{
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.medium,
                  color: COLORS.primaryColor,
                }}>
                Log-out
              </Text>
            </TouchableOpacity>
          </View>
          <CustomBottomModal
            isGuestPicker={isPasswordReset}
            setIsGuestPicker={setIsPasswordReset}
            modalHeight={350}
            onHardwareBackPress={onClosePasswordResetModal}
            onTouchOutside={onClosePasswordResetModal}
            modalTitle={
              <Header
                left={
                  <EntypoIcon
                    name="chevron-left"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                }
                title="Reset Password"
                leftPressHandler={onClosePasswordResetModal}
              />
            }
            modalContent={
              <View style={{marginTop: 15, marginHorizontal: 12, gap: 7}}>
                <View>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                    }}>
                    Current Password
                  </Text>
                  <InputFields
                    data={currentPassword}
                    setData={setCurrentPassword}
                    placeholder="Enter Your Current Password"
                    secureTextEntry={isCurrentPasswordVisible ? false : true}
                    icon={
                      <SimpleLineIcons
                        name="lock"
                        size={24}
                        color={'#8b8a8aae'}
                      />
                    }
                    eyeIcon={
                      isCurrentPasswordVisible ? (
                        <FeatherIcon
                          name="eye-off"
                          size={24}
                          color={'#8b8a8aae'}
                        />
                      ) : (
                        <FeatherIcon name="eye" size={24} color={'#8b8a8aae'} />
                      )
                    }
                    onEyePressHandler={() =>
                      setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                    }
                  />
                  <Text
                    style={{
                      backgroundColor: COLORS.blueColorBlur,
                      height: 1.5,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                    }}>
                    New Password
                  </Text>
                  <InputFields
                    data={newPassword}
                    setData={setNewPassword}
                    placeholder="Enter Your New Password"
                    secureTextEntry={isNewPasswordVisible ? false : true}
                    icon={
                      <SimpleLineIcons
                        name="lock"
                        size={24}
                        color={'#8b8a8aae'}
                      />
                    }
                    eyeIcon={
                      isNewPasswordVisible ? (
                        <FeatherIcon
                          name="eye-off"
                          size={24}
                          color={'#8b8a8aae'}
                        />
                      ) : (
                        <FeatherIcon name="eye" size={24} color={'#8b8a8aae'} />
                      )
                    }
                    onEyePressHandler={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                  />
                  <Text
                    style={{
                      backgroundColor: COLORS.blueColorBlur,
                      height: 1.5,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: FONTS.mediumText,
                      fontWeight: WEIGHT.mediumText,
                      color: COLORS.primaryColor,
                    }}>
                    Confirm New Password
                  </Text>
                  <InputFields
                    data={confirmNewPassword}
                    setData={setConfirmNewPassword}
                    placeholder="Enter Your New Password Again"
                    secureTextEntry={isConfirmNewPasswordVisible ? false : true}
                    icon={
                      <SimpleLineIcons
                        name="lock"
                        size={24}
                        color={'#8b8a8aae'}
                      />
                    }
                    eyeIcon={
                      isConfirmNewPasswordVisible ? (
                        <FeatherIcon
                          name="eye-off"
                          size={24}
                          color={'#8b8a8aae'}
                        />
                      ) : (
                        <FeatherIcon name="eye" size={24} color={'#8b8a8aae'} />
                      )
                    }
                    onEyePressHandler={() =>
                      setIsConfirmNewPasswordVisible(
                        !isConfirmNewPasswordVisible,
                      )
                    }
                  />
                  <Text
                    style={{
                      backgroundColor: COLORS.blueColorBlur,
                      height: 1.5,
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={onPasswordResetHandler}
                  activeOpacity={0.35}
                  style={{
                    backgroundColor: COLORS.mainButtonColor,
                    marginTop: 10,
                    paddingVertical: 12,
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.forgotText,
                      color: COLORS.whiteColor,
                      fontFamily: FONT_FAMILY.bold,
                    }}>
                    Reset Password
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.primaryColor,
              fontFamily: FONT_FAMILY.bold,
            }}>
            Please Log-in to proceed further
          </Text>
          <TouchableOpacity
            onPress={() => {
              setLoginShowModal(false);
              navigation.navigate('LogIn');
            }}
            activeOpacity={0.35}
            style={{
              width: '90%',
              marginTop: 10,
              borderRadius: 7,
              backgroundColor: COLORS.mainButtonColor,
            }}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                color: COLORS.whiteColor,
              }}>
              Log-in Now
            </Text>
          </TouchableOpacity>
          <CustomBottomModal
            isGuestPicker={loginShowModal}
            setIsGuestPicker={setLoginShowModal}
            modalHeight={150}
            onHardwareBackPress={() => setLoginShowModal(false)}
            onTouchOutside={() => setLoginShowModal(false)}
            modalTitle={
              <Header
                title="Log-In"
                left={
                  <EntypoIcon
                    name="chevron-left"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                }
                leftPressHandler={() => setLoginShowModal(false)}
              />
            }
            modalContent={
              <View
                style={{
                  marginTop: 20,
                  justifyContent: 'space-around',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    color: COLORS.primaryColor,
                    fontFamily: FONT_FAMILY.bold,
                  }}>
                  Please LogIn first to proceed further.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setLoginShowModal(false);
                    navigation.navigate('LogIn');
                  }}
                  activeOpacity={0.35}
                  style={{
                    marginTop: 10,
                    borderRadius: 7,
                    backgroundColor: COLORS.mainButtonColor,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      color: COLORS.whiteColor,
                    }}>
                    Log-in Now
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default AccountScreen;
