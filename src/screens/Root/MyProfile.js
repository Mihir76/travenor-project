import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../../store';
import Header from '../../component/Root/Header';
import EntrypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
const MyProfile = () => {
  const navigation = useNavigation();
  const {userDetails} = useStore();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header
        title="My Profile"
        left={
          <EntrypoIcon
            name="chevron-left"
            size={24}
            color={COLORS.primaryColor}
          />
        }
        leftPressHandler={() => navigation.goBack()}
        right={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.mainButtonColor,
              paddingHorizontal: 5,
              paddingVertical: 5,
              gap: 5,
              borderRadius: 7,
            }}>
            <FeatherIcon name="edit" size={20} color={COLORS.whiteColor} />
            <Text
              style={{
                fontSize: FONTS.mediumText,
                fontWeight: WEIGHT.mediumText,
                color: COLORS.whiteColor,
              }}>
              Edit
            </Text>
          </View>
        }
        rightPressHandler={() => navigation.navigate('CompleteProfile')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{gap: 10, marginTop: 10, marginHorizontal: 12}}>
        <Image
          source={{uri: userDetails?.profilePicture}}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 5,
            borderColor: COLORS.primaryBorderColor,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />

        {/* email */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Email</Text>
          <Text style={styles.textStyle}>{userDetails?.email}</Text>
        </View>

        {/* name */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Name</Text>
          <Text style={styles.textStyle}>{userDetails?.name}</Text>
        </View>

        {/* contact number */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Contact Number</Text>
          <Text style={styles.textStyle}>{userDetails?.phoneNumber}</Text>
        </View>

        {/* address */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Address</Text>
          <Text style={styles.textStyle}>
            {userDetails?.address?.addressLine1}
          </Text>
        </View>

        {/* landmark */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Landmark</Text>
          <Text style={styles.textStyle}>{userDetails?.address?.landMark}</Text>
        </View>

        {/* city */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>City</Text>
          <Text style={styles.textStyle}>{userDetails?.address?.city}</Text>
        </View>

        {/* zip-code */}
        <View style={{gap: 5}}>
          <Text style={styles.titleStyle}>Postal Code</Text>
          <Text style={styles.textStyle}>{userDetails?.address?.zipCode}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  textStyle: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryBorderColor,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 7,
    fontSize: FONTS.extraInfo,
    fontWeight: WEIGHT.extraInfo,
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.primaryColor,
  },
  titleStyle: {
    marginHorizontal: 12,
    fontSize: FONTS.extraInfo,
    fontWeight: WEIGHT.extraInfo,
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.primaryColor,
  },
});
