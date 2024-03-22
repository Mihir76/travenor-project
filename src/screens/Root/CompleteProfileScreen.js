import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useStore} from '../../../store';
import Geolocation from '@react-native-community/geolocation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Header from '../../component/Root/Header';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {baseUrl} from '../../constants/url';

const geoApiKey = '';

const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  useEffect(() => {
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log(error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    getLocation();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);
  useEffect(() => {
    if (
      (userDetails?.name != null || userDetails?.name != undefined) &&
      userDetails?.name.length > 0
    ) {
      setName(userDetails?.name);
    }

    if (
      (userDetails?.phoneNumber != null ||
        userDetails?.phoneNumber != undefined) &&
      userDetails?.phoneNumber.length > 0
    ) {
      setContactNumber(userDetails?.phoneNumber);
    }

    if (userDetails?.address?.addressLine1) {
      setAddress(userDetails?.address?.addressLine1);
    }

    if (userDetails?.address?.landMark) {
      setLandmark(userDetails?.address?.landMark);
    }

    if (userDetails?.address?.city) {
      setCity(userDetails?.address?.city);
    }

    if (userDetails?.address?.zipCode) {
      setZip(userDetails?.address?.zipCode);
    }
  }, []);
  const {userDetails, setUserDetails} = useStore();
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [profile_pic, setProfile_pic] = useState(userDetails?.profilePicture);

  // update profile function
  const updateProfileHandler = () => {
    const formData = new FormData();
    formData.append('profile_pic', {
      uri: profile_pic,
      type: 'image/jpeg',
      name: 'userProfileImage.jpg',
    });
    formData.append('email', userDetails?.email);
    formData.append('name', name);
    formData.append('phoneNumber', contactNumber);
    formData.append('addressLine1', address);
    formData.append('landMark', landmark);
    formData.append('city', city);
    formData.append('zipCode', zip);
    axios
      .post(`${baseUrl}api/v1/user/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // console.log(response.data);
        if (response.data.success) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          setUserDetails(response.data.userDetails);
          navigation.goBack();
        } else {
          return Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header
        title="Edit Profile"
        left={
          <EntypoIcon
            name="chevron-left"
            color={COLORS.primaryColor}
            size={24}
          />
        }
        leftPressHandler={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: 8, paddingTop: 10}}
        contentContainerStyle={{paddingBottom: 10}}>
        <View style={{marginVertical: 10}}>
          <Image
            source={{uri: profile_pic}}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 75,
              alignSelf: 'center',
              borderWidth: 5,
              borderColor: COLORS.primaryBorderColor,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={async () => {
              const result = await launchImageLibrary();
              setProfile_pic(result?.assets[0]?.uri);
            }}>
            <FeatherIcons
              name="edit"
              size={24}
              color={COLORS.primaryColor}
              style={{position: 'absolute', bottom: 1, right: '37.5%'}}
            />
          </TouchableOpacity>
        </View>
        {/* email  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Email
          </Text>
          <Text
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 6,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {userDetails?.email}
          </Text>
        </View>

        {/* name  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter Your Name"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>

        {/* Phone Number  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Contact Number
          </Text>
          <TextInput
            value={contactNumber}
            maxLength={10}
            keyboardType="number-pad"
            onChangeText={text => setContactNumber(text)}
            placeholder="Enter Your Contact Number"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>
        {/* address  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginHorizontal: 12,
                fontSize: FONTS.extraInfo,
                fontWeight: WEIGHT.extraInfo,
                fontFamily: FONT_FAMILY.bold,
                color: COLORS.primaryColor,
              }}>
              Address
            </Text>
            <TouchableOpacity
              onPress={() => {
                axios
                  .get(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${geoApiKey}`,
                  )
                  .then(response => {
                    setAddress(
                      response.data.features[0].properties.address_line1,
                    );
                    setLandmark(response.data.features[0].properties.street);
                    setCity(response.data.features[0].properties.city);
                    setZip(response.data.features[0].properties.postcode);
                  })
                  .catch(error => {
                    console.log(error.message);
                  });
              }}
              activeOpacity={0.35}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.mainButtonColor,
                marginRight: 12,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 7,
              }}>
              <FontAwesome6
                name="location-dot"
                size={24}
                color={COLORS.whiteColor}
              />
              <Text
                style={{
                  marginHorizontal: 12,
                  fontSize: FONTS.extraInfo,
                  fontWeight: WEIGHT.extraInfo,
                  fontFamily: FONT_FAMILY.bold,
                  color: COLORS.whiteColor,
                }}>
                Current Location
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter Your Address"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>
        {/* land-mark  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Landmark
          </Text>
          <TextInput
            value={landmark}
            onChangeText={text => setLandmark(text)}
            placeholder="Enter Your Landmark"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>
        {/* city  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            City
          </Text>
          <TextInput
            value={city}
            onChangeText={text => setCity(text)}
            placeholder="Enter Your City Name"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>
        {/* zip-code  */}
        <View style={{gap: 5, marginVertical: 10}}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.bold,
              color: COLORS.primaryColor,
            }}>
            Zip
          </Text>
          <TextInput
            value={zip}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={text => setZip(text)}
            placeholder="Enter Your Postal Code"
            style={{
              marginHorizontal: 12,
              borderWidth: 1,
              borderColor: COLORS.primaryBorderColor,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: COLORS.whiteColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}
          />
        </View>
        {/* ---- update profile button-----  */}
        <TouchableOpacity
          onPress={updateProfileHandler}
          activeOpacity={0.35}
          style={{
            marginVertical: 10,
            backgroundColor: COLORS.mainButtonColor,
            width: '65%',
            alignSelf: 'center',
            paddingVertical: 12,
            borderRadius: 7,
          }}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              color: COLORS.whiteColor,
              textAlign: 'center',
              fontFamily: FONT_FAMILY.bold,
            }}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileScreen;
