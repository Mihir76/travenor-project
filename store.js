import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set, get) => ({
      userDetails: {},
      authToken: '',
      hotelCart: [],
      packageCart: [],
      setUserDetails: userDetail =>
        set(
          produce(state => {
            state.userDetails = userDetail;
          }),
        ),
      addHotelToCart: hotelData =>
        set(
          produce(state => {
            state.hotelCart.push(hotelData);
          }),
        ),
      setAuthToken: token =>
        set(
          produce(state => {
            state.authToken = token;
          }),
        ),
    }),

    {
      name: 'travenor-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
