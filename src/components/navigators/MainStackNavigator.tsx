import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import PlayerScreen from '../player/playerScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator headerMode="none" mode="modal">
    <MainStack.Screen name="Tabs" component={MainTabNavigator} />
    <MainStack.Screen name="Player" component={PlayerScreen} />
  </MainStack.Navigator>
);

export default MainStackNavigator;
