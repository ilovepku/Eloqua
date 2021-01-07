import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import SearchScreen from '../searchScreen/SearchScreen'
import PersonsListScreen from '../personsListScreen/PersonsListScreen'
import CategoriesListScreen from '../categoriesListScreen/CategoriesListScreen'
import FilteredPiecesListScreen from '../filteredPiecesListScreen/FilteredPiecesListScreen'

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

function PersonsStackNavigator() {
  return (
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
        }) => ({
          title,
        })}
        component={FilteredPiecesListScreen}
      />
    </PersonsStack.Navigator>
  )
}

function CategoriesStackNavigator() {
  return (
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
        }) => ({
          title,
        })}
        component={FilteredPiecesListScreen}
      />
    </CategoriesStack.Navigator>
  )
}

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Search" component={SearchScreen} />
      <TopTab.Screen name="Speakers" component={PersonsStackNavigator} />
      <TopTab.Screen name="Categories" component={CategoriesStackNavigator} />
    </TopTab.Navigator>
  )
}
