import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ListenNowScreen from '../listenNow/ListenNowScreen';
import LibraryScreen from '../library/LibraryScreen';
import PodcastDetailsScreen from '../podcastDetails/PodcastDetailsScreen';
import SearchScreen from '../search/SearchScreen';
import EpisodeDetailsScreen from '../episodeDetails/EpisodeDetailsScreen';
import MiniPlayer from '../miniPlayer/MiniPlayer';

const ICON_SIZE = 24;

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const PodcastStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const ListenNowStackNavigator = () => (
  <ListenNowStack.Navigator>
    <ListenNowStack.Screen
      name="ListenNow"
      options={{
        title: 'Listen Now',
        headerTitleAlign: 'center',
      }}
      component={ListenNowScreen}
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

const PodcastStackNavigator = () => (
  <PodcastStack.Navigator>
    <PodcastStack.Screen
      name="PodcastDetails"
      component={PodcastDetailsScreen}
    />
    <PodcastStack.Screen
      name="EpisodeDetails"
      component={EpisodeDetailsScreen}
    />
  </PodcastStack.Navigator>
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
      name="PodcastStack"
      options={{title: '', headerBackTitleVisible: true}}
      component={PodcastStackNavigator}
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
      name="ListenNow"
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
