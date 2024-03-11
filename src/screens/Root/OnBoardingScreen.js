import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
let isLocationGranted;
let isCameraGranted;
let isAudioGranted;
let isMicGranted;
let requestPermission = [];

const DATA = [
  {
    id: 1,
    image: require('../../assets/image/trip1.png'),
    title: 'Easy Access to your daily trips.',
    subTitle: '',
  },
  {
    id: 2,
    image: require('../../assets/image/trip2.png'),
    title: 'Personal details.',
    subTitle: 'Upload/Manage your personal details',
  },
  {
    id: 3,
    image: require('../../assets/image/trip3.png'),
    title: 'Notification for new trip.',
    subTitle: 'Any changes made in your trip will notified immediately ',
  },
];

const OnBoardingScreen = () => {
  // check for user-permissions
  useEffect(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ])
      .then(statuses => {
        isLocationGranted = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
        isCameraGranted = statuses[PERMISSIONS.ANDROID.CAMERA];
        isAudioGranted = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
        isMicGranted = statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];

        if (isLocationGranted !== 'granted') {
          requestPermission.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (isCameraGranted !== 'granted') {
          requestPermission.push(PERMISSIONS.ANDROID.CAMERA);
        }
        if (isAudioGranted !== 'granted') {
          requestPermission.push(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
        if (isMicGranted !== 'granted') {
          requestPermission.push(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        }

        if (requestPermission.length > 0) {
          requestMultiple(requestPermission)
            .then(statuses => {
              console.log(
                statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
                statuses[PERMISSIONS.ANDROID.CAMERA],
                statuses[PERMISSIONS.ANDROID.RECORD_AUDIO],
                statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState(0);
  const onNextHandler = async () => {
    if (activeScreen === 2) {
      await AsyncStorage.setItem('isExistingUser', 'true');
      navigation.navigate('Bottom');
    } else {
      setActiveScreen(activeScreen + 1);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.whiteColor,
        justifyContent: 'space-around',
      }}>
      <StatusBar
        backgroundColor={COLORS.whiteColor}
        barStyle={'dark-content'}
      />

      <View style={{alignItems: 'center', gap: 15}}>
        <Text
          style={{
            color: COLORS.primaryColor,
            fontFamily: FONT_FAMILY.medium,
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
          }}>
          App name
        </Text>
        <Image source={require('../../assets/image/coordinator.png')} />
      </View>
      <View style={{alignItems: 'center', gap: 15}}>
        <Image source={DATA[activeScreen].image} />
        <Text
          style={{
            color: COLORS.primaryColor,
            fontFamily: FONT_FAMILY.medium,
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
          }}>
          {DATA[activeScreen].title}
        </Text>
        <Text
          style={{
            fontSize: FONTS.mediumText,
            fontWeight: WEIGHT.mediumText,
            color: COLORS.primaryColor,
          }}>
          {DATA[activeScreen].subTitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.35}
          onPress={async () => {
            await AsyncStorage.setItem('isExistingUser', 'true');
            navigation.navigate('Bottom');
          }}>
          <Text
            style={{
              color: COLORS.primaryColor,
              fontWeight: WEIGHT.extraInfo,
              fontSize: FONTS.extraInfo,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 10}}>
          {DATA.map(item => {
            let isActive = activeScreen === item.id - 1;
            return (
              <View
                key={item.id}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: isActive
                    ? COLORS.mainButtonColor
                    : '#c5cc0044',
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.35}
          onPress={onNextHandler}
          style={{
            backgroundColor: COLORS.mainButtonColor,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 7,
          }}>
          <OcticonsIcons
            name="arrow-right"
            size={24}
            color={COLORS.blackColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
