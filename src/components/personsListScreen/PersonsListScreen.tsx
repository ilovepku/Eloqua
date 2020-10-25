import React from 'react';
import {View, ScrollView} from 'react-native';
import {useQuery} from '@apollo/client';
import tailwind from 'tailwind-rn';

import peronsQuery from '../../graphql/query/personsQuery';
import {PersonsQuery_person} from '../../types/graphql';

import Error from '../error/Error';
import Loading from '../loading/Loading';
import PersonItem from './PersonItem';

export default function PersonsList() {
  const {loading, error, data} = useQuery(peronsQuery);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error errMsg={error.message} />;
  }

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ScrollView
        contentContainerStyle={tailwind(
          'flex-row flex-wrap justify-evenly pb-4',
        )}>
        {data.persons.map((person: PersonsQuery_person) => (
          <PersonItem key={`person-${person.id}`} person={person} />
        ))}
      </ScrollView>
    </View>
  );
}
