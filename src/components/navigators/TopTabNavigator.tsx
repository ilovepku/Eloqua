import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SearchScreen from '../search/SearchScreen';
import CategoriesScreen from '../categories/CategoriesScreen';
import PiecesList from '../piecesList/PiecesList';

type CategoriesStackParamList = {
  CategoriesList: undefined;
  CategoryPiecesList: {title: string};
};

const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
const TopTab = createMaterialTopTabNavigator();

function CategoriesStackNavigator() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="CategoriesList"
        options={{
          headerShown: false,
        }}
        component={CategoriesScreen}
      />
      <CategoriesStack.Screen
        name="CategoryPiecesList"
        options={({
          route: {
            params: {title},
          },
        }) => ({
          title,
        })}
        component={PiecesList}
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
