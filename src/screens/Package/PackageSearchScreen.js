import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import Header from '../../component/Root/Header';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ErrorLoading from '../../component/Loading/ErrorLoading';
import {baseUrl} from '../../constants/url';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import CustomBottomModal from '../../component/Root/CustomBottomModal';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PackageItemCard from '../../component/package/PackageItemCard';

const SORTINGOPTIONS = [
  {
    id: 1,
    title: 'Budget Friendly',
  },
  {
    id: 2,
    title: 'Recommended',
  },
  {
    id: 3,
    title: 'Luxury',
  },
  {
    id: 4,
    title: 'Weekend Getaway',
  },
];

const PackageSearchScreen = ({route}) => {
  const navigation = useNavigation();
  const date = route.params?.date;
  const guests = route.params?.guests;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [packageDataBackUp, setPackageDataBackUp] = useState([]);
  const [activeSortingCategory, setActiveSortingCategory] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);

  useEffect(() => {
    if (isDataLoaded) {
      let minimum = 999999;
      let maximum = 0;
      for (let i = 0; i < packageData.length; i++) {
        if (minimum > parseInt(packageData[i].packageCost)) {
          minimum = parseInt(packageData[i].packageCost);
        }
        if (maximum < parseInt(packageData[i].packageCost)) {
          maximum = parseInt(packageData[i].packageCost);
        }
      }
      setMinPrice(minimum);
      setMaxPrice(maximum);
      setSelectedMinPrice(minimum);
      setSelectedMaxPrice(maximum);
    }
  }, [isDataLoaded]);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/v1/packages/getPackage`)
      .then(response => {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setPackageData(response.data.packages);
        setPackageDataBackUp(response.data.packages);
        setIsDataLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onFilterCloseHandler = () => {
    if (activeSortingCategory == 1) {
      setPackageData(
        packageData.filter(
          item =>
            item.packageType == 'Budget Friendly' &&
            item.packageCost >= selectedMinPrice &&
            item.packageCost <= selectedMaxPrice,
        ),
      );
    } else if (activeSortingCategory == 2) {
      setPackageData(
        packageData.filter(
          item =>
            item.packageType == 'Recommended' &&
            item.packageCost >= selectedMinPrice &&
            item.packageCost <= selectedMaxPrice,
        ),
      );
    } else if (activeSortingCategory == 3) {
      setPackageData(
        packageData.filter(
          item =>
            item.packageType == 'Luxury' &&
            item.packageCost >= selectedMinPrice &&
            item.packageCost <= selectedMaxPrice,
        ),
      );
    } else if (activeSortingCategory == 4) {
      setPackageData(
        packageData.filter(
          item =>
            item.packageType == 'Weekend Getaway' &&
            item.packageCost >= selectedMinPrice &&
            item.packageCost <= selectedMaxPrice,
        ),
      );
    }

    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <StatusBar barStyle={'dark-content'} />
      <Header
        left={
          <EntypoIcon
            name="chevron-left"
            size={24}
            color={COLORS.primaryColor}
          />
        }
        title="Packages Result"
        leftPressHandler={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginVertical: 15,
          backgroundColor: COLORS.primaryColor,
          borderRadius: 7,
          width: wp('95%'),
          height: hp('10%'),
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.regular,
              fontWeight: WEIGHT.extraInfo,
            }}>
            Date : {date}
          </Text>
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.regular,
              fontWeight: WEIGHT.extraInfo,
            }}>
            Guest : {guests.adults} Adults, {guests.children} Children
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignItems: 'center', gap: 5}}
          activeOpacity={0.35}>
          <FeatherIcon name="edit" size={24} color={COLORS.whiteColor} />
          <Text
            style={{
              fontSize: FONTS.extraInfo,
              color: COLORS.whiteColor,
              fontFamily: FONT_FAMILY.regular,
              fontWeight: WEIGHT.extraInfo,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {isDataLoaded && packageData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <LottieView
            autoPlay
            loop
            source={require('../../animation/noDataFound.json')}
            style={{width: wp('50%'), height: hp('30%')}}
          />
          <Text
            style={{
              fontSize: FONTS.appTittle,
              fontWeight: WEIGHT.appTittle,
              color: COLORS.primaryColor,
            }}>
            Package data does not Found!
          </Text>
        </View>
      ) : isDataLoaded && packageData.length > 0 ? (
        <View style={{flex: 1, paddingBottom: 10, alignSelf: 'center'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: wp('95%')}}>
            {packageData.map(packageItem => {
              return (
                <View key={packageItem?._id}>
                  <PackageItemCard
                    packageItem={packageItem}
                    date={date}
                    guests={guests}
                  />
                </View>
              );
            })}
          </ScrollView>
          <CustomBottomModal
            modalHeight={400}
            isGuestPicker={isFilterOpen}
            setIsGuestPicker={setIsFilterOpen}
            onHardwareBackPress={onFilterCloseHandler}
            onTouchOutside={onFilterCloseHandler}
            modalTitle={
              <Header
                title="Filter"
                left={
                  <IoniconsIcon
                    name="close"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                }
                right={
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      fontFamily: FONT_FAMILY.bold,
                      color: COLORS.primaryColor,
                    }}>
                    Reset
                  </Text>
                }
                rightPressHandler={() => {
                  axios
                    .get(`${baseUrl}api/v1/packages/getPackage`)
                    .then(response => {
                      setPackageData(response.data.packages);
                      setPackageDataBackUp(response.data.packages);
                      setIsDataLoaded(true);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  setSelectedMinPrice(minPrice);
                  setSelectedMaxPrice(maxPrice);
                  setActiveSortingCategory(0);
                  setIsFilterOpen(!isFilterOpen);
                }}
                leftPressHandler={onFilterCloseHandler}
              />
            }
            modalContent={
              <>
                {/* price base filtering  */}
                <View
                  style={{
                    backgroundColor: COLORS.backgroundColor,
                    marginTop: 15,
                    borderRadius: 7,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      fontFamily: FONT_FAMILY.bold,
                      color: COLORS.primaryColor,
                    }}>
                    Price
                  </Text>
                  <View>
                    <ScrollView>
                      <MultiSlider
                        onValuesChange={value => {
                          setSelectedMinPrice(value[0]);
                          setSelectedMaxPrice(value[1]);
                        }}
                        step={500}
                        containerStyle={{alignSelf: 'center'}}
                        isMarkersSeparated={true}
                        min={minPrice}
                        max={maxPrice}
                        values={[selectedMinPrice, selectedMaxPrice]}
                        customMarkerLeft={e => {
                          return (
                            <View
                              currentValue={e.currentValue}
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.primaryColor,
                                backgroundColor: COLORS.primaryBorderColor,
                              }}
                            />
                          );
                        }}
                        customMarkerRight={e => {
                          return (
                            <View
                              currentValue={e.currentValue}
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.primaryColor,
                                backgroundColor: COLORS.primaryBorderColor,
                              }}
                            />
                          );
                        }}
                      />
                    </ScrollView>

                    {/* display the starting and ending prices  */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
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
                            textAlign: 'center',
                          }}>
                          ₹{selectedMinPrice}
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
                          ₹{selectedMaxPrice}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* all four the sorting methods  */}
                <View
                  style={{
                    backgroundColor: COLORS.backgroundColor,
                    marginTop: 15,
                    borderRadius: 7,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      fontFamily: FONT_FAMILY.bold,
                      color: COLORS.primaryColor,
                    }}>
                    Sort By
                  </Text>

                  <View style={{marginTop: 10, gap: 5}}>
                    {SORTINGOPTIONS.map(sortingOption => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            setActiveSortingCategory(sortingOption.id)
                          }
                          activeOpacity={0.35}
                          key={sortingOption.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                          }}>
                          {activeSortingCategory == sortingOption.id ? (
                            <FontistoIcon
                              name="radio-btn-active"
                              size={24}
                              color={COLORS.primaryColor}
                            />
                          ) : (
                            <FontistoIcon
                              name="radio-btn-passive"
                              size={24}
                              color={COLORS.primaryColor}
                            />
                          )}
                          <Text
                            style={{
                              fontSize: FONTS.forgotText,
                              fontWeight: WEIGHT.forgotText,
                              fontFamily: FONT_FAMILY.medium,
                              color: COLORS.primaryColor,
                            }}>
                            {sortingOption.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* done button  */}
                <TouchableOpacity
                  onPress={onFilterCloseHandler}
                  activeOpacity={0.35}
                  style={{
                    position: 'absolute',
                    bottom: '3%',
                    left: '35%',
                    right: '35%',
                    borderRadius: 7,
                    padding: 10,
                    backgroundColor: COLORS.mainButtonColor,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.whiteColor,
                      fontSize: FONTS.extraInfo,
                      fontWeight: WEIGHT.extraInfo,
                      fontFamily: FONT_FAMILY.bold,
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </>
            }
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              bottom: '8%',
              left: '25%',
              right: '25%',
              backgroundColor: COLORS.mainButtonColor,
              justifyContent: 'space-around',
              paddingHorizontal: 8,
              paddingVertical: 8,
              borderRadius: 25,
            }}>
            <Text
              style={{
                fontSize: FONTS.appTittle,
                fontWeight: WEIGHT.appTittle,
                color: COLORS.whiteColor,
              }}>
              {packageData.length} Packages
            </Text>

            <TouchableOpacity
              activeOpacity={0.35}
              onPress={() => setIsFilterOpen(!isFilterOpen)}>
              <IoniconsIcon
                name="options"
                size={24}
                color={COLORS.whiteColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ErrorLoading />
      )}
    </View>
  );
};

export default PackageSearchScreen;
