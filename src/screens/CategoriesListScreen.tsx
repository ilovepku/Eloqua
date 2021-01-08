import React from 'react'
import {View, ScrollView} from 'react-native'
import {useQuery} from '@apollo/client'
import tailwind from 'tailwind-rn'

import categoriesQuery from '../graphql/query/categoriesQuery'
import {CategoriesQueryCategory} from '../types/graphql'

import Error from '../components/Error'
import Loading from '../components/Loading'
import CategoryItem from '../components/CategoryItem'

const CategoriesListScreen: React.FC = () => {
  const {loading, error, data} = useQuery(categoriesQuery)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error errMsg={error.message} />
  }

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView
        contentContainerStyle={tailwind(
          'flex-row flex-wrap justify-evenly pb-4',
        )}
      >
        {data.categories.map((category: CategoriesQueryCategory) => (
          <CategoryItem key={`category-${category.id}`} category={category} />
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoriesListScreen
