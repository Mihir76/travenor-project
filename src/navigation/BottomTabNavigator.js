import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Root/HomeScreen';
import FavScreen from '../screens/Root/FavScreen';
import BookingScreen from '../screens/Root/BookingScreen';
import AccountScreen from '../screens/Root/AccountScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../theme/theme';

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primaryColor,
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <IoniconsIcon
                name="home-sharp"
                size={24}
                color={COLORS.whiteColor}
              />
            ) : (
              <IoniconsIcon name="home-outline" size={24} color={'white'} />
            ),
          tabBarLabelStyle: {
            fontSize: FONTS.placeHolder,
            color: COLORS.whiteColor,
            fontFamily: FONT_FAMILY.medium,
            fontWeight: WEIGHT.placeHolder,
          },
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <AntDesignIcons
                name="heart"
                size={24}
                color={COLORS.whiteColor}
              />
            ) : (
              <AntDesignIcons
                name="hearto"
                size={24}
                color={COLORS.whiteColor}
              />
            ),
          tabBarLabelStyle: {
            fontSize: FONTS.placeHolder,
            color: COLORS.whiteColor,
            fontFamily: FONT_FAMILY.medium,
            fontWeight: WEIGHT.placeHolder,
          },
        }}
      />
      <Tabs.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <IoniconsIcon
                name="briefcase"
                size={24}
                color={COLORS.whiteColor}
              />
            ) : (
              <IoniconsIcon
                name="briefcase-outline"
                size={24}
                color={COLORS.whiteColor}
              />
            ),
          tabBarLabelStyle: {
            fontSize: FONTS.placeHolder,
            color: COLORS.whiteColor,
            fontFamily: FONT_FAMILY.medium,
            fontWeight: WEIGHT.placeHolder,
          },
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesomeIcon
                name="user"
                size={30}
                color={COLORS.whiteColor}
              />
            ) : (
              <FontAwesomeIcon
                name="user-o"
                size={24}
                color={COLORS.whiteColor}
              />
            ),
          tabBarLabelStyle: {
            fontSize: FONTS.placeHolder,
            color: COLORS.whiteColor,
            fontFamily: FONT_FAMILY.medium,
            fontWeight: WEIGHT.placeHolder,
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabNavigator;
