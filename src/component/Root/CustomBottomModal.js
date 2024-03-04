import {Text, View} from 'react-native';
import React from 'react';
import {BottomModal, ModalContent} from 'react-native-modals';

const CustomBottomModal = ({
  isGuestPicker,
  setIsGuestPicker,
  modalContent,
  modalHeight,
}) => {
  return (
    <BottomModal
      visible={isGuestPicker}
      swipeDirection={['up', 'down']}
      swipeThreshold={200}
      onTouchOutside={() => setIsGuestPicker(!isGuestPicker)}
      onHardwareBackPress={() => setIsGuestPicker(!isGuestPicker)}>
      <ModalContent
        style={{
          height: modalHeight,
        }}>
        {modalContent}
      </ModalContent>
    </BottomModal>
  );
};

export default CustomBottomModal;
