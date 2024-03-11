import {Text, View} from 'react-native';
import React from 'react';
import {BottomModal, ModalContent} from 'react-native-modals';

const CustomBottomModal = ({
  modalTitle,
  isGuestPicker,
  setIsGuestPicker,
  modalContent,
  modalHeight,
  onTouchOutside,
  onHardwareBackPress,
}) => {
  return (
    <BottomModal
      modalTitle={modalTitle}
      visible={isGuestPicker}
      swipeDirection={['up', 'down']}
      swipeThreshold={200}
      onTouchOutside={onTouchOutside}
      onHardwareBackPress={onHardwareBackPress}>
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
