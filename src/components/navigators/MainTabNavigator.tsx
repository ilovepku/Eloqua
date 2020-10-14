import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TopTabNavigator from './TopTabNavigator';
import LibraryScreen from '../library/LibraryScreen';
import MiniPlayer from '../miniPlayer/MiniPlayer';

const BOTTOM_TAB_BAR_ICON_SIZE = 24;

const LibraryStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function LibraryStackNavigator() {
  return (
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
}

export default function MainTabNavigator() {
  return (
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
        name="Explore"
        component={TopTabNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons
              size={BOTTOM_TAB_BAR_ICON_SIZE}
              color={color}
              name="explore"
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons
              size={BOTTOM_TAB_BAR_ICON_SIZE}
              color={color}
              name="favorite"
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
