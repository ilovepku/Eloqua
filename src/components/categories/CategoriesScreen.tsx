import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import categoriesQuery from '../../graphql/query/categoriesQuery';
import {CategoriesQuery_category} from '../../types/graphql';
import {ASSETS_URL} from '../../settings';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const {data, loading, error} = useQuery(categoriesQuery);

  return error ? (
    <View style={tailwind('flex-1 bg-white items-center justify-center')}>
      <Text style={tailwind('text-lg text-red-600')}>{error.message}</Text>
    </View>
  ) : loading ? (
    <View style={tailwind('flex-1 bg-white items-center')}>
      <ActivityIndicator size="large" color="#42a5f5" />
    </View>
  ) : (
    <View style={tailwind('flex-1 bg-white flex-row flex-wrap justify-evenly')}>
      {(data?.categories ?? []).map(
        ({id, name, icon_filename}: CategoriesQuery_category) => (
          <TouchableOpacity
            key={`category-${id}`}
            style={tailwind('w-1/3 h-24 mt-4 items-center')}
            onPress={() =>
              navigation.navigate('CategoryPiecesList', {
                title: name,
                category_id_filter: `category-${id}`,
              })
            }>
            <Image
              source={{
                uri: `${ASSETS_URL}/icons%2F${icon_filename}?alt=media`,
              }}
              style={tailwind('h-20 w-20 rounded-full')}
            />
            <View style={tailwind('flex-1 text-gray-700')}>
              <Text style={tailwind('text-center text-xs')}>{name}</Text>
            </View>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

export default CategoriesScreen;
