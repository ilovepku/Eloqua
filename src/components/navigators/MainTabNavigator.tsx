import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import TopTabNavigator from './TopTabNavigator';
import LibraryScreen from '../library/LibraryScreen';
import MiniPlayer from '../miniPlayer/MiniPlayer';

const ICON_SIZE = 24;

const LibraryStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

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
        title: 'Explore',
        tabBarIcon: ({color}) => (
          <FeatherIcon size={ICON_SIZE} color={color} name="headphones" />
        ),
      }}
      component={TopTabNavigator}
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
  </MainTab.Navigator>
);

export default MainTabNavigator;
