import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '../constants/styles/Default';

export default function Results() {
  const router = useRouter();
  const { totalTime } = useLocalSearchParams(); // Passa il tempo totale come parametro

  // Funzione per formattare il tempo in minuti e secondi
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <ImageBackground source={require('@/assets/images/results-backdrop.gif')} style={styles.container} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Congratulazioni!</Text>
        <Text style={styles.text}>Hai completato il gioco in {formatTime(Number(totalTime))} minuti!</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/routes')}>
          <Text style={styles.buttonText}>Torna alla Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
