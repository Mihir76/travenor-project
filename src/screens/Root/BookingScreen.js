import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../../../store';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../component/Root/Header';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const BookingScreen = () => {
  const navigation = useNavigation();
  const {authToken, setAuthToken, setUserDetails, userDetails} = useStore();
  const [loginShowModal, setLoginShowModal] = useState(false);
  const isFocused = useIsFocused();
  console.log(authToken);
  useEffect(() => {
    if (authToken.length == 0 && isFocused) setLoginShowModal(true);
  }, [isFocused, authToken]);
  return (
    <View style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      {authToken.length > 0 ? (
        <Text>User is Login</Text>
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
    </View>
  );
};

export default BookingScreen;
