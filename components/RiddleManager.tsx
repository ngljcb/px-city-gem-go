import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import MapScreen from './MapScreen';
import PhotoVerification from './PhotoVerification';

const RiddleManager = () => {
  const { routeId } = useLocalSearchParams();
  const [riddles, setRiddles] = useState<any[]>([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [riddle, setRiddle] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [isCorrect, setIsCorrect] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  // Carica gli indovinelli da Firestore
  useEffect(() => {
    if (routeId) {
      const fetchRiddles = async () => {
        try {
          const riddlesQuery = query(
            collection(FIREBASE_DB, `/Routes/${routeId}/Questions`),
            orderBy('route_order', 'asc')
          );

          const querySnapshot = await getDocs(riddlesQuery);
          const riddlesArray = querySnapshot.docs.map((doc) => doc.data());

          if (riddlesArray.length > 0) {
            setRiddles(riddlesArray);
            loadRiddle(0, riddlesArray);
          }
        } catch (error) {
          console.error('Errore nel caricamento degli indovinelli:', error);
          Alert.alert(
            'Errore',
            'Non è stato possibile caricare gli indovinelli.'
          );
        }
      };

      fetchRiddles();
    }
  }, [routeId]);

  const loadRiddle = (index: number, riddlesArray: any[] = riddles) => {
    if (index < riddlesArray.length) {
      setRiddle(riddlesArray[index].question);
      setAnswer(riddlesArray[index].answer);
      setCoordinates({
        latitude: riddlesArray[index].gps.latitude,
        longitude: riddlesArray[index].gps.longitude,
      });
      setIsCorrect(false);
      setUserAnswer('');
      setPhotoVerified(false);
    }
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()) {
      setIsCorrect(true);
      Alert.alert('Corretto!', 'Ora scatta una foto per procedere.');
    } else {
      Alert.alert('Sbagliato', 'Riprova con un’altra risposta.');
      setUserAnswer('');
    }
  };

  const handlePhotoVerified = (success: boolean) => {
    if (success) {
      if (startTime === null) {
        setStartTime(Date.now());
      }

      const nextIndex = currentRiddleIndex + 1;

      if (nextIndex < riddles.length) {
        setPhotoVerified(true);
        Alert.alert('Foto verificata!', 'Passa al prossimo indovinello.', [
          {
            text: 'Avanti',
            onPress: () => {
              setCurrentRiddleIndex(nextIndex);
              loadRiddle(nextIndex);
            },
          },
        ]);
      } else {
        const totalTime = Date.now() - (startTime ?? Date.now());
        setCompletionTime(totalTime);
        Alert.alert(
          'Congratulazioni!',
          `Hai completato tutti gli indovinelli in ${formatTime(
            totalTime
          )} minuti.`
        );
        router.replace('/routes');
      }
    } else {
      Alert.alert(
        'Errore',
        'La foto non è stata scattata nel posto giusto. Riprova.'
      );
    }
  };

  // Funzione per formattare il tempo in MM:SS
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.riddleText}>{riddle}</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci la tua risposta"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      {!isCorrect && <Button title="Invia" onPress={checkAnswer} />}

      {isCorrect &&
        coordinates.latitude !== 0 &&
        coordinates.longitude !== 0 && (
          <MapScreen
            key={`${coordinates.latitude}-${coordinates.longitude}`}
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            isCorrect={isCorrect}
          />
        )}

      <PhotoVerification
        coordinates={coordinates}
        isAnswerCorrect={isCorrect}
        onPhotoVerified={handlePhotoVerified}
      />

      {completionTime !== null && (
        <Text style={styles.timerText}>
          Tempo di completamento: {formatTime(completionTime)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: 400,
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

export default RiddleManager;
