import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
const deviceHeight = Dimensions.get('window').height;

const PackageItemCard = ({packageItem, date, guests}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PackageDetails', {
          packageItem: packageItem,
          date: date,
          guests: guests,
        })
      }
      activeOpacity={0.35}
      key={packageItem?._id}
      style={{
        borderWidth: 1.5,
        borderColor: COLORS.primaryBorderColor,
        backgroundColor: COLORS.whiteColor,
        flexDirection: 'row',
        height: deviceHeight < 800 ? hp('29%') : hp('27%'),
        marginBottom: 10,
        borderRadius: 7,
        overflow: 'hidden',
      }}>
      <Image
        source={{uri: packageItem?.packageImage}}
        style={{width: '35%', height: '100%'}}
      />
      <View style={{width: '65%', padding: 10, gap: 10}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: FONTS.extraInfo,
            fontWeight: WEIGHT.extraInfo,
            color: COLORS.primaryColor,
            fontFamily: FONT_FAMILY.bold,
          }}>
          {packageItem?.packageName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: FONTS.mediumText,
              fontWeight: WEIGHT.mediumText,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            {packageItem?.rating}
          </Text>
          <AntDesignIcon name="star" size={24} color={COLORS.ratingColor} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <FontistoIcon name="clock" size={22} color={COLORS.primaryColor} />
          <Text
            numberOfLines={1}
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            Duration : (N/{packageItem?.nights} D/
            {parseInt(packageItem?.nights) + 1})
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              borderWidth: 1,
              borderColor: COLORS.primaryColor,
              paddingHorizontal: 16,
              paddingVertical: 4,
              backgroundColor: COLORS.backgroundColor,
              color: COLORS.primaryColor,
              borderRadius: 7,
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
            }}>
            {packageItem?.packageType}
          </Text>
        </View>

        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.medium,
              color: COLORS.primaryColor,
            }}>
            ₹{packageItem?.packageCost + '\nPer Person'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PackageItemCard;
