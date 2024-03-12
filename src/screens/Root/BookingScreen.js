import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomModal from '../../component/Root/CustomBottomModal';

const BookingScreen = () => {
  const [isLogin, setIsLogIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('authToken').then(authToken => {
      console.log(authToken);
      if (authToken == null || authToken == undefined) {
        setIsLogIn(false);
      } else {
        setIsLogIn(true);
      }
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      {isLogin ? (
        <Text>Login user</Text>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>You have to Log-In in-order to proceed further.</Text>
        </View>
      )}
    </View>
  );
};

export default BookingScreen;
