import React from 'react'
import {View, TouchableOpacity, Image, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import tailwind from 'tailwind-rn'

import {CategoriesQueryCategory} from '../types/graphql'
import {ASSETS_URL} from '../settings'

interface Props {
  category: CategoriesQueryCategory
}

const CategoryItem: React.FC<Props> = ({
  category: {name, id, icon_filename: iconFilename},
}) => {
  const navigation = useNavigation()

  const navigateToFilteredPiecesListScreen = (): void => {
    navigation.navigate('FilteredPiecesListScreen', {
      title: name,
      categoryIdFilter: `category-${id}`,
    })
  }

  return (
    <TouchableOpacity
      style={tailwind('w-1/3 h-24 mt-4 items-center')}
      onPress={navigateToFilteredPiecesListScreen}
    >
      <Image
        source={{
          uri: `${ASSETS_URL}/icons%2F${iconFilename}?alt=media`,
        }}
        style={tailwind('h-20 w-20 rounded-full mb-1')}
      />
      <View style={tailwind('flex-1 text-gray-700')}>
        <Text style={tailwind('text-center text-xs')}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryItem
