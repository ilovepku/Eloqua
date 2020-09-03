import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';

import MainStackNavigator from './src/components/navigators/MainStackNavigator';
import client from './src/graphql/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
