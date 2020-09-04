import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather'

import ListenNowScreen from '../listenNow/ListenNowScreen';
import SearchScreen from '../search/SearchScreen';
import LibraryScreen from '../library/LibraryScreen';
import PodcastDetails from "../podcastDetails/PodcastDetailsScreen"

const ICON_SIZE = 24

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        name="ListenNow"
        options={{
          title: 'Listen Now',
          headerTitleAlign: 'center'
        }}
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
        options={{
          title: 'Library',
          headerTitleAlign: 'center'
        }}
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
        options={{
          title: 'Search',
          headerTitleAlign: 'center'
        }}
        component={SearchScreen}
      />
      <SearchStack.Screen
        name="PodcastDetails"
        options={{ title: '' }}
        component={PodcastDetails}
      />
    </SearchStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeTintColor: "#42a5f5"
      }}>{/* TODO: theme color */}
      <MainTab.Screen
        name="ListenNow"
        options={{
          title: 'Listen Now',
          tabBarIcon: ({ color }) => <FeatherIcon size={ICON_SIZE} color={color} name="headphones" />
        }}
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <FeatherIcon size={ICON_SIZE} color={color} name="inbox" />
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <FeatherIcon size={ICON_SIZE} color={color} name="search" />
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
