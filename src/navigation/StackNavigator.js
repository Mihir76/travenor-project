import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/Root/SplashScreen';
import OnBoardingScreen from '../screens/Root/OnBoardingScreen';
import CartScreen from '../screens/Carts/CartScreen';
import HotelDestinationPicker from '../screens/Hotels/HotelDestinationPicker';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
