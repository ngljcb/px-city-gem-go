import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { formatTime } from '@/utils/timeFormatter';
import { styles } from '../styles/Default';

export default function Results() {
  const router = useRouter();
  const { totalTime, routeId } = useLocalSearchParams();
  const routeIdStr = Array.isArray(routeId) ? routeId[0] : routeId;

  const handleRouteSelect = (routeId: string) => {
    router.push({
      pathname: '/scoreboard',
      params: { routeId },
    });
  };

  return (
    <ImageBackground source={require('@/assets/images/results-backdrop.gif')} style={styles.container} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Congratulazioni!</Text>
        <Text style={styles.text}>Hai completato il gioco in {formatTime(Number(totalTime))} minuti!</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleRouteSelect(routeIdStr)}>
          <Text style={styles.buttonText}>Torna alla Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
