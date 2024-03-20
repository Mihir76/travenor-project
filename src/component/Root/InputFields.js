import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
const InputFields = ({
  data,
  setData,
  secureTextEntry,
  icon,
  placeholder,
  eyeIcon,
  onEyePressHandler,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          paddingVertical: 5,
        }}>
        {icon}
        <TextInput
          placeholder={placeholder}
          value={data}
          onChangeText={text => setData(text)}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          style={{
            width: '80%',
          }}
        />
      </View>
      <TouchableOpacity onPress={onEyePressHandler} style={{marginRight: 10}}>
        {eyeIcon}
      </TouchableOpacity>
    </View>
  );
};

export default InputFields;
