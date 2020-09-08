import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import tailwind from 'tailwind-rn';

import feedQuery from '../../graphql/query/feedQuery';
import {getWeekDay, getReadableDuration} from '../../lib/dateTimeHelper';
import {usePlayerContext} from '../../contexts/PlayerContext';
import {SearchQuery_search} from '../../types/graphql';

const PodcastDetialsScreen = () => {
  const playerContext = usePlayerContext();

  const navigation = useNavigation();

  const {data: podcastData} = (useRoute().params ?? {}) as {
    data: SearchQuery_search;
  };

  const {thumbnail, podcastName, artist, feedUrl} = podcastData;

  const {data, loading, error} = useQuery(feedQuery, {
    variables: {
      feedUrl,
    },
  });

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <FlatList
        ListHeaderComponent={
          <View style={tailwind('px-4')}>
            <View style={tailwind('flex-row my-4')}>
              {thumbnail && (
                <Image
                  source={{uri: thumbnail}}
                  style={tailwind('h-20 w-20 mr-4 rounded-lg')}
                />
              )}
              <View style={tailwind('flex-1')}>
                <Text style={tailwind('text-lg font-bold')}>{podcastName}</Text>
                <Text style={tailwind('text-sm text-gray-600')}>{artist}</Text>
                <Text style={tailwind('text-sm text-blue-600')}>
                  Subscribed
                </Text>
              </View>
            </View>
            <View style={tailwind('flex-row mb-4 items-center')}>
              <TouchableOpacity
                onPress={() => {
                  const el = data?.feed[0];
                  if (!el) {
                    return;
                  }
                  const {title, image, linkUrl} = el;

                  playerContext.play({
                    title: title,
                    artwork: image ?? thumbnail,
                    id: linkUrl,
                    url: linkUrl,
                    artist: artist,
                  });
                }}>
                <FeatherIcon
                  size={30}
                  color="#42a5f5"
                  name="play"
                  style={tailwind('mr-2')}
                />
              </TouchableOpacity>
              <View style={tailwind('flex-1')}>
                <Text style={tailwind('font-bold')}>Play</Text>
                <Text style={tailwind('text-sm')}>{data?.feed[0].title}</Text>
              </View>
            </View>

            <Text style={tailwind('mb-4 text-lg font-bold')}>Episodes</Text>

            {loading && (
              <View style={tailwind('h-64 items-center justify-center')}>
                <ActivityIndicator size="large" color="#42a5f5" />
              </View>
            )}
            {/* TODO: theme color */}
          </View>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <View style={tailwind('my-4 px-4')}>
            <View
              style={[
                {height: StyleSheet.hairlineWidth},
                tailwind('bg-gray-600'),
              ]}
            />
          </View>
        )}
        renderItem={({item}) => {
          const {pubDate, title, description, duration} = item;
          return (
            <View style={tailwind('px-4')}>
              <Text style={tailwind('text-sm text-gray-600')}>
                {getWeekDay(new Date(pubDate)).toUpperCase()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EpisodeDetails', {
                    episode: item,
                    podcast: podcastData,
                  })
                }>
                <Text style={tailwind('font-bold')}>{title}</Text>
              </TouchableOpacity>
              <Text style={tailwind('text-sm text-gray-600')} numberOfLines={2}>
                {description}
              </Text>
              <Text style={tailwind('text-sm text-gray-600')}>
                {getReadableDuration(duration)}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.linkUrl}
      />
    </View>
  );
};

export default PodcastDetialsScreen;
