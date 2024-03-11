import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import HotelListCard from '../../component/hotel/HotelListCard';
import {useNavigation} from '@react-navigation/native';

const DESTINATION = [
  {
    id: 1,
    name: 'Mumbai',
    image:
      'https://t3.ftcdn.net/jpg/03/55/64/04/240_F_355640480_FKKv2BQwqY6sMa6jmEGVPnEndX1GPtJU.jpg',
  },
  {
    id: 2,
    name: 'Delhi',
    image:
      'https://as2.ftcdn.net/v2/jpg/04/09/50/27/1000_F_409502739_pv2Lehr8cOUqSWE1nvWmdqC8u2RQc9PH.jpg',
  },
  {
    id: 3,
    name: 'Hyderabad',
    image:
      'https://as2.ftcdn.net/v2/jpg/00/47/49/01/1000_F_47490128_JLClMTbZyVdxl3OW2m8H4vJHW7hDZ8Jj.jpg',
  },
  {
    id: 4,
    name: 'Jaipur',
    image:
      'https://as2.ftcdn.net/v2/jpg/00/57/34/49/1000_F_57344934_px7aizqPZKKtedtgnXcDpid0YwHvrfjW.jpg',
  },
  {
    id: 5,
    name: 'Goa',
    image:
      'https://as1.ftcdn.net/v2/jpg/00/78/51/06/1000_F_78510639_g4pdntUhKh7WA6krVbJGZpi7L2Edi9qE.jpg',
  },
  {
    id: 6,
    name: 'Bangalore',
    image:
      'https://as1.ftcdn.net/v2/jpg/00/16/22/28/1000_F_16222872_lDOjn8RK2jF50mtpOXNjcFywBj9jfx1H.jpg',
  },
  {
    id: 7,
    name: 'Ahmedabad',
    image:
      'https://as1.ftcdn.net/v2/jpg/05/52/27/54/1000_F_552275461_QdEaatYXQ1KGbAe08Xnh2bo8gp9Pmq5a.jpg',
  },
  {
    id: 8,
    name: 'Manali',
    image:
      'https://as2.ftcdn.net/v2/jpg/02/57/91/21/1000_F_257912197_ySuBhefKYPQIZNa3xeGiObLpgYBnH9U5.jpg',
  },
];

const HotelDestinationPicker = ({route}) => {
  const navigation = useNavigation();
  const updateDestination = route?.params?.updateDestination;
  const [searchedDestination, setSearchedDestination] = useState('');
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(DESTINATION);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 12,
        backgroundColor: COLORS.backgroundColor,
      }}>
      {/* search-bar  */}
      <View
        style={{
          backgroundColor: COLORS.whiteColor,
          paddingHorizontal: 10,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: COLORS.primaryBorderColor,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <FontAwesomeIcons
            name="search"
            size={24}
            color={COLORS.primaryColor}
          />
          <TextInput
            placeholder="Search Your Destination"
            style={{
              fontSize: FONTS.extraInfo,
              fontWeight: WEIGHT.extraInfo,
              fontFamily: FONT_FAMILY.regular,
              width: '90%',
              color: COLORS.primaryColor,
            }}
            value={searchedDestination}
            onChangeText={text => {
              setSearchedDestination(text);
              setNewData(
                DESTINATION.filter(destination =>
                  destination.name.toLowerCase().includes(text.toLowerCase()),
                ),
              );
            }}
          />
        </View>
        {searchedDestination.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={() => {
              setSearchedDestination('');
              setNewData(DESTINATION);
            }}>
            <EntypoIcon name="cross" size={24} style={{marginRight: 10}} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* list of destinations  */}
      <KeyboardAvoidingView style={{marginTop: 15, flex: 1}}>
        <Text
          style={{
            fontSize: FONTS.appTittle,
            fontWeight: WEIGHT.appTittle,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primaryColor,
          }}>
          Popular destinations
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10, flex: 1}}
          contentContainerStyle={{gap: 5}}
          data={newData}
          keyExtractor={item => item.id}
          renderItem={destinationItem => (
            <HotelListCard
              Destination={destinationItem.item}
              onPress={() => {
                updateDestination(destinationItem.item.name);
                navigation.goBack();
              }}
            />
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default HotelDestinationPicker;
