import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ListenNowScreen from '../listenNow/ListenNowScreen';
import SearchScreen from '../search/SearchScreen';
import LibraryScreen from '../library/LibraryScreen';

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        name="ListenNow"
        options={{title: 'Listen Now'}}
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        options={{title: 'Library'}}
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        options={{title: 'Search'}}
        component={SearchScreen}
      />
    </SearchStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="ListenNow"
        options={{title: 'Listen Now'}}
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen name="Library" component={LibraryStackNavigator} />
      <MainTab.Screen name="Search" component={SearchStackNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
