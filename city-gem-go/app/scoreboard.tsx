import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import useScoreboardViewModel from '../viewmodels/ScoreboardViewModel';
import { Score } from '../models/ScoreboardModel';

import { formatTime } from '@/utils/timeFormatter';
import { styles } from '../styles/Scoreboard';

export default function Scoreboard() {
  const { routeId } = useLocalSearchParams();
  const routeIdStr = Array.isArray(routeId) ? routeId[0] : (routeId as string);
  const { scores, loading } = useScoreboardViewModel(routeIdStr);

  const renderItem = ({ item, index }: { item: Score; index: number }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.userId}>{item['user-name']}</Text>
      <Text style={styles.time}>{formatTime(item['total-time'])}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('@/assets/images/results-backdrop.gif')} style={styles.container} resizeMode="cover">
      {loading ? (
        <Image source={require('@/assets/images/loading.gif')} style={styles.img} resizeMode="cover" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Classifica - Top 10</Text>
          <FlatList
            data={scores}
            keyExtractor={(item, index) => `${item['user-name']}-${index}`}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.noData}>Nessun dato disponibile</Text>}
          />
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/routes')}>
            <Text style={styles.buttonText}>Torna alla Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
