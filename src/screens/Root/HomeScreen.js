import {FlatList, View, Image, Text, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../theme/theme';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CategoryItem from '../../component/Root/CategoryItem';
import HotelHome from '../Hotels/HotelHome';
import FlightHome from '../Flight/FlightHome';
import PackageHome from '../Package/PackageHome';
import TransferHome from '../Transfer/TransferHome';
import NeedhelpHome from '../Need help/NeedhelpHome';
import ErrorLoading from '../../component/Loading/ErrorLoading';
import Header from '../../component/Root/Header';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../component/Root/NoInternet';
import {useNavigation} from '@react-navigation/native';

const CATEGORIES = [
  {
    id: 1,
    title: 'HOTEL',
    activeIcon: (
      <FontAwesome6Icon name="hotel" size={35} color={COLORS.whiteColor} />
    ),
    inactiveIcon: (
      <FontAwesome6Icon name="hotel" size={35} color={COLORS.primaryColor} />
    ),
  },
  {
    id: 2,
    title: 'FLIGHT',
    activeIcon: (
      <MaterialIcons name="flight" size={35} color={COLORS.whiteColor} />
    ),
    inactiveIcon: (
      <MaterialIcons name="flight" size={35} color={COLORS.primaryColor} />
    ),
  },
  {
    id: 3,
    title: 'PACKAGE',
    activeIcon: (
      <FontAwesome5Icon
        name="suitcase-rolling"
        size={35}
        color={COLORS.whiteColor}
      />
    ),
    inactiveIcon: (
      <FontAwesome5Icon
        name="suitcase-rolling"
        size={35}
        color={COLORS.primaryColor}
      />
    ),
  },
  {
    id: 4,
    title: 'TRANSFER',
    activeIcon: <FontistoIcon name="car" size={35} color={COLORS.whiteColor} />,
    inactiveIcon: (
      <FontistoIcon name="car" size={35} color={COLORS.primaryColor} />
    ),
  },
  {
    id: 5,
    title: 'NEED HELP?',
    activeIcon: (
      <EntypoIcon name="help-with-circle" size={35} color={COLORS.whiteColor} />
    ),
    inactiveIcon: (
      <EntypoIcon
        name="help-with-circle"
        size={35}
        color={COLORS.primaryColor}
      />
    ),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  // ------- check for internet connectivity -----------
  const [isNetConnected, setIsNetConnected] = useState(true);
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsNetConnected(state.isConnected);
    });
  }, []);

  // active-category
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header
        left={<Image source={require('../../assets/image/menu.png')} />}
        title="Travenor"
        right={
          <FontAwesome5Icon
            name="shopping-cart"
            size={18}
            color={COLORS.primaryColor}
          />
        }
        leftPressHandler={() => {
          console.log('Left Pressed');
        }}
        rightPressHandler={() => {
          navigation.navigate('Cart');
        }}
      />

      {/* conditional rendering  */}

      {isNetConnected ? (
        <>
          {/* -------------- different categories --------------- */}
          <View style={{marginTop: 25, marginHorizontal: 8}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              contentContainerStyle={{gap: 10}}
              renderItem={categoryItem => (
                <CategoryItem
                  categoryItem={categoryItem.item}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              )}
            />
          </View>

          {/* -------------- different module screens --------------- */}

          {activeCategory === 1 ? (
            <HotelHome />
          ) : activeCategory === 2 ? (
            <FlightHome />
          ) : activeCategory === 3 ? (
            <PackageHome />
          ) : activeCategory === 4 ? (
            <TransferHome />
          ) : activeCategory === 5 ? (
            <NeedhelpHome />
          ) : (
            <ErrorLoading />
          )}
        </>
      ) : (
        <NoInternet />
      )}
    </View>
  );
};

export default HomeScreen;
