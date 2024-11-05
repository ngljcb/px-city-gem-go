// riddles.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MapScreen from '@/components/MapScreen';
import PhotoVerification from '@/components/PhotoVerification';
import UserSessionManager from '@/components/UserSessionManager';
import RiddleManager from '@/components/RiddleManager';
import { getAuth } from 'firebase/auth';

const Riddles = () => {
  const { routeId } = useLocalSearchParams();
  const routeIdStr = Array.isArray(routeId) ? routeId[0] : routeId;
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [riddleSession] = useState(new RiddleManager());

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (routeIdStr) {
      riddleSession
        .loadRiddles(routeIdStr)
        .then(() => {
          const initialRiddle = riddleSession.getCurrentRiddle();
          if (!initialRiddle) {
            Alert.alert('Errore', 'Non è stato possibile caricare gli indovinelli.');
          }
        })
        .catch((error) => {
          console.error('Errore nel caricamento degli indovinelli:', error);
          Alert.alert('Errore', 'Non è stato possibile caricare gli indovinelli.');
        });
    }
  }, [routeIdStr]);

  const currentRiddle = riddleSession.getCurrentRiddle();

  const checkAnswer = () => {
    if (riddleSession.checkAnswer(userAnswer)) {
      setIsCorrect(true);
      Alert.alert('Corretto!', 'Ora scatta una foto per procedere.');

      // Avvia la sessione al primo indovinello risolto
      if (riddleSession.isFirstRiddle() && user && routeIdStr) {
        UserSessionManager.startSession(user.uid, routeIdStr)
          .then(() => console.log('Session started'))
          .catch((error) => console.error('Error starting session:', error));
      }
    } else {
      Alert.alert('Sbagliato', 'Riprova con un’altra risposta.');
      setUserAnswer('');
    }
  };

  const handlePhotoVerified = async (success: boolean) => {
    if (success) {
      if (riddleSession.isLastRiddle()) {
        const totalTime = await UserSessionManager.completeSession();
        if (totalTime !== null) {
          setCompletionTime(totalTime);
          Alert.alert('Congratulazioni!', `Hai completato tutti gli indovinelli in ${formatTime(totalTime)} minuti.`);
        }
        router.replace('/routes');
      } else {
        setPhotoVerified(true);
        Alert.alert('Foto verificata!', 'Passa al prossimo indovinello.', [
          {
            text: 'Avanti',
            onPress: () => {
              riddleSession.moveToNextRiddle();
              setIsCorrect(false);
              setUserAnswer('');
              setPhotoVerified(false);
            },
          },
        ]);
      }
    } else {
      Alert.alert('Errore', 'La foto non è stata scattata nel posto giusto. Riprova.');
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.riddleText}>{currentRiddle?.question}</Text>
      <TextInput style={styles.input} placeholder="Inserisci la tua risposta" value={userAnswer} onChangeText={setUserAnswer} />
      {!isCorrect && <Button title="Invia" onPress={checkAnswer} />}

      {isCorrect && currentRiddle && (
        <MapScreen
          key={`${currentRiddle.gps.latitude}-${currentRiddle.gps.longitude}`}
          latitude={currentRiddle.gps.latitude}
          longitude={currentRiddle.gps.longitude}
          isCorrect={isCorrect}
        />
      )}

      <PhotoVerification
        coordinates={currentRiddle ? currentRiddle.gps : { latitude: 0, longitude: 0 }}
        isAnswerCorrect={isCorrect}
        onPhotoVerified={handlePhotoVerified}
      />

      {completionTime !== null && <Text style={styles.timerText}>Tempo di completamento: {formatTime(completionTime)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  riddleText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Riddles;
