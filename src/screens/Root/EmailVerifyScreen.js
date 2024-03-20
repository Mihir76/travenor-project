import {View, Text} from 'react-native';
import React from 'react';

const EmailVerifyScreen = ({route}) => {
  const email = route?.params?.email;
  console.log(email);
  return (
    <View>
      <Text>EmailVerifyScreen</Text>
    </View>
  );
};

export default EmailVerifyScreen;
