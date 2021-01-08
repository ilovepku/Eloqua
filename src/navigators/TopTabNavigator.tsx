import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import SearchScreen from '../screens/SearchScreen'
import PersonsListScreen from '../screens/PersonsListScreen'
import CategoriesListScreen from '../screens/CategoriesListScreen'
import FilteredPiecesListScreen from '../screens/FilteredPiecesListScreen'

type PersonsStackParamList = {
  PersonsListScreen: undefined
  FilteredPiecesListScreen: {title: string}
}

type CategoriesStackParamList = {
  CategoriesListScreen: undefined
  FilteredPiecesListScreen: {title: string}
}

const PersonsStack = createStackNavigator<PersonsStackParamList>()
const CategoriesStack = createStackNavigator<CategoriesStackParamList>()
const TopTab = createMaterialTopTabNavigator()

const PersonsStackNavigator: React.FC = () => (
  <PersonsStack.Navigator>
    <PersonsStack.Screen
      name="PersonsListScreen"
      options={{
        headerShown: false,
      }}
      component={PersonsListScreen}
    />
    <PersonsStack.Screen
      name="FilteredPiecesListScreen"
      options={({
        route: {
          params: {title},
        },
      }): {title: string} => ({
        title,
      })}
      component={FilteredPiecesListScreen}
    />
  </PersonsStack.Navigator>
)

const CategoriesStackNavigator: React.FC = () => (
  <CategoriesStack.Navigator>
    <CategoriesStack.Screen
      name="CategoriesListScreen"
      options={{
        headerShown: false,
      }}
      component={CategoriesListScreen}
    />
    <CategoriesStack.Screen
      name="FilteredPiecesListScreen"
      options={({
        route: {
          params: {title},
        },
      }): {title: string} => ({
        title,
      })}
      component={FilteredPiecesListScreen}
    />
  </CategoriesStack.Navigator>
)

const TopTabNavigator: React.FC = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Search" component={SearchScreen} />
    <TopTab.Screen name="Speakers" component={PersonsStackNavigator} />
    <TopTab.Screen name="Categories" component={CategoriesStackNavigator} />
  </TopTab.Navigator>
)

export default TopTabNavigator
