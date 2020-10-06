import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AllPiecesScreen from '../allPieces/AllPiecesScreen';
import CategoriesScreen from '../categories/CategoriesScreen';
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
