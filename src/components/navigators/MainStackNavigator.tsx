import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
