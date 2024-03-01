import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, WEIGHT} from '../../theme/theme';

const CategoryItem = ({categoryItem, activeCategory, setActiveCategory}) => {
  let isActiveCategory = activeCategory === categoryItem?.id;
  return (
    <TouchableOpacity
      onPress={() => setActiveCategory(categoryItem?.id)}
      key={categoryItem?.id}
      activeOpacity={0.35}
      style={{
        width: 90,
        height: 80,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: COLORS.primaryColorBlur,
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 5,
        backgroundColor: isActiveCategory
          ? COLORS.primaryColor
          : COLORS.whiteColor,
      }}>
      {isActiveCategory ? categoryItem?.activeIcon : categoryItem?.inactiveIcon}
      <Text
        style={[
          {fontSize: FONTS.placeHolder, fontWeight: WEIGHT.placeHolder},
          isActiveCategory
            ? {color: COLORS.whiteColor}
            : {color: COLORS.primaryColor},
        ]}>
        {categoryItem?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
