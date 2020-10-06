import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AllPiecesScreen from '../allPiecesScreen/AllPiecesScreen';
import CategoriesScreen from '../categoriesScreen/CategoriesScreen';
import PiecesList from '../PiecesList/PiecesList';

type CategoriesStackParamList = {
  CategoriesList: undefined;
  CategoryPiecesList: {title: string};
};

const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
const TopTab = createMaterialTopTabNavigator();

const CategoriesStackNavigator = () => (
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

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Search" component={AllPiecesScreen} />
      <TopTab.Screen name="Categories" component={CategoriesStackNavigator} />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
