import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/Root/SplashScreen';
import OnBoardingScreen from '../screens/Root/OnBoardingScreen';
import CartScreen from '../screens/Carts/CartScreen';
import HotelDestinationPicker from '../screens/Hotels/HotelDestinationPicker';
import HotelSearchResult from '../component/hotel/HotelSearchResult';
import HotelDetailsScreen from '../screens/Hotels/HotelDetailsScreen';
import BookingFormScreen from '../screens/Root/BookingFormScreen';
import BookingSuccessfull from '../screens/Root/BookingSuccessfull';
import PackageSearchScreen from '../screens/Package/PackageSearchScreen';
import PackageDetailScreen from '../screens/Package/PackageDetailScreen';
import LogInScreen from '../screens/Root/LogInScreen';
import SingUpScreen from '../screens/Root/SingUpScreen';
import EmailVerifyScreen from '../screens/Root/EmailVerifyScreen';
import CompleteProfileScreen from '../screens/Root/CompleteProfileScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={OnBoardingScreen} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="HotelDestination"
          component={HotelDestinationPicker}
        />
        <Stack.Screen name="HotelSearchResult" component={HotelSearchResult} />
        <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
        <Stack.Screen name="PackageSearch" component={PackageSearchScreen} />
        <Stack.Screen name="PackageDetails" component={PackageDetailScreen} />
        <Stack.Screen name="FormFill" component={BookingFormScreen} />
        <Stack.Screen
          name="BookingSuccessFull"
          component={BookingSuccessfull}
        />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SingUp" component={SingUpScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerifyScreen} />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
