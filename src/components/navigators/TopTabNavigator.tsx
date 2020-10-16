import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SearchScreen from '../searchScreen/SearchScreen';
import CategoriesListScreen from '../categoriesListScreen/CategoriesListScreen';
import CategoriesPiecesListScreen from '../categoriesPiecesListScreen/CategoriesPiecesListScreen';

type CategoriesStackParamList = {
  CategoriesListScreen: undefined;
  CategoryPiecesListScreen: {title: string};
};

const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
const TopTab = createMaterialTopTabNavigator();

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
        name="CategoryPiecesListScreen"
        options={({
          route: {
            params: {title},
          },
        }) => ({
          title,
        })}
        component={CategoriesPiecesListScreen}
      />
    </CategoriesStack.Navigator>
  );
}

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Search" component={SearchScreen} />
      <TopTab.Screen name="Categories" component={CategoriesStackNavigator} />
    </TopTab.Navigator>
  );
}
