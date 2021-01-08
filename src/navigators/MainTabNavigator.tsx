import React, {ReactElement} from 'react'
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TopTabNavigator from './TopTabNavigator'
import FavoritesScreen from '../screens/FavoritesScreen'
import MiniPlayer from '../components/MiniPlayer'

const BOTTOM_TAB_BAR_ICON_SIZE = 24

const MainTab = createBottomTabNavigator()

const MainTabNavigator: React.FC = () => (
  <MainTab.Navigator
    tabBar={(tabsProps): ReactElement => (
      <>
        <MiniPlayer />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <BottomTabBar {...tabsProps} />
      </>
    )}
    tabBarOptions={{
      activeTintColor: '#42a5f5',
    }}
  >
    {/* TODO: theme color */}
    <MainTab.Screen
      name="Explore"
      component={TopTabNavigator}
      options={{
        tabBarIcon: ({color}): ReactElement => (
          <MaterialIcons
            size={BOTTOM_TAB_BAR_ICON_SIZE}
            color={color}
            name="explore"
          />
        ),
      }}
    />
    <MainTab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({color}): ReactElement => (
          <MaterialIcons
            size={BOTTOM_TAB_BAR_ICON_SIZE}
            color={color}
            name="favorite"
          />
        ),
      }}
    />
  </MainTab.Navigator>
)

export default MainTabNavigator
