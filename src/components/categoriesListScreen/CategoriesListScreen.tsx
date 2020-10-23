import React from 'react';
import {View, ScrollView} from 'react-native';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import categoriesQuery from '../../graphql/query/categoriesQuery';
import {CategoriesQuery_category} from '../../types/graphql';

import Error from '../error/Error';
import Loading from '../loading/Loading';
import CategoryItem from './CategoryItem';

export default function CategoriesListScreen() {
  const {loading, error, data} = useQuery(categoriesQuery);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error errMsg={error.message} />
  ) : (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView
        contentContainerStyle={tailwind(
          'flex-row flex-wrap justify-evenly pb-4',
        )}>
        {data.categories.map((category: CategoriesQuery_category) => (
          <CategoryItem key={`category-${category.id}`} category={category} />
        ))}
      </ScrollView>
    </View>
  );
}
