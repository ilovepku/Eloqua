import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AllPiecesScreen from '../allPiecesScreen/AllPiecesScreen';
import LibraryScreen from '../library/LibraryScreen';
import SearchScreen from '../search/SearchScreen';
import PodcastDetailsScreen from '../podcastDetails/PodcastDetailsScreen';
import EpisodeDetailsScreen from '../episodeDetails/EpisodeDetailsScreen';
import MiniPlayer from '../miniPlayer/MiniPlayer';

const ICON_SIZE = 24;

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const ListenNowStackNavigator = () => (
  <ListenNowStack.Navigator>
    <ListenNowStack.Screen
      name="AllPieces"
      options={{
        title: 'Explore',
        headerTitleAlign: 'center',
      }}
      component={AllPiecesScreen}
    />
  </ListenNowStack.Navigator>
);

const LibraryStackNavigator = () => (
  <LibraryStack.Navigator>
    <LibraryStack.Screen
      name="Library"
      options={{
        title: 'Library',
        headerTitleAlign: 'center',
      }}
      component={LibraryScreen}
    />
  </LibraryStack.Navigator>
);

const SearchStackNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Search"
      options={{
        title: 'Search',
        headerTitleAlign: 'center',
      }}
      component={SearchScreen}
    />
    <SearchStack.Screen
      name="PodcastDetails"
      options={{title: '', headerBackTitleVisible: true}}
      component={PodcastDetailsScreen}
    />
    <SearchStack.Screen
      name="EpisodeDetails"
      options={{title: '', headerBackTitleVisible: true}}
      component={EpisodeDetailsScreen}
    />
  </SearchStack.Navigator>
);

const MainTabNavigator = () => (
  <MainTab.Navigator
    tabBar={(tabsProps) => (
      <>
        <MiniPlayer />
        <BottomTabBar {...tabsProps} />
      </>
    )}
    tabBarOptions={{
      activeTintColor: '#42a5f5',
    }}>
    {/* TODO: theme color */}
    <MainTab.Screen
      name="AllPieces"
      options={{
        title: 'Listen Now',
        tabBarIcon: ({color}) => (
          <FeatherIcon size={ICON_SIZE} color={color} name="headphones" />
        ),
      }}
      component={ListenNowStackNavigator}
    />
    <MainTab.Screen
      name="Library"
      component={LibraryStackNavigator}
      options={{
        tabBarIcon: ({color}) => (
          <FeatherIcon size={ICON_SIZE} color={color} name="inbox" />
        ),
      }}
    />
    <MainTab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        tabBarIcon: ({color}) => (
          <FeatherIcon size={ICON_SIZE} color={color} name="search" />
        ),
      }}
    />
  </MainTab.Navigator>
);

export default MainTabNavigator;
