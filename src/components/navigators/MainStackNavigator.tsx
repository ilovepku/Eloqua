import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import PlayerScreen from '../playerScreen/PlayerScreen';
import QueueScreen from '../queueScreen/QueueScreen';

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator headerMode="none" mode="modal">
      <MainStack.Screen name="Tabs" component={MainTabNavigator} />
      <MainStack.Screen name="Player" component={PlayerScreen} />
      <MainStack.Screen name="Queue" component={QueueScreen} />
    </MainStack.Navigator>
  );
}
