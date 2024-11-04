import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import MapScreen from '../components/MapScreen';
import PhotoVerification from '../components/PhotoVerification';

const RiddleScreen = () => {
  const { routeId } = useLocalSearchParams();
  const [riddles, setRiddles] = useState<any[]>([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [riddle, setRiddle] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [isCorrect, setIsCorrect] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);

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
    } else {
      Alert.alert('Congratulazioni!', 'Hai completato tutti gli indovinelli.');
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
      setPhotoVerified(true);
      Alert.alert('Foto verificata!', 'Passa al prossimo indovinello.', [
        {
          text: 'Avanti',
          onPress: () => {
            const nextIndex = currentRiddleIndex + 1;
            if (nextIndex < riddles.length) {
              setCurrentRiddleIndex(nextIndex);
              loadRiddle(nextIndex);
            } else {
              Alert.alert(
                'Congratulazioni!',
                'Hai completato tutti gli indovinelli.'
              );
              router.replace('/routes');
            }
          },
        },
      ]);
    } else {
      Alert.alert(
        'Errore',
        'La foto non è stata scattata nel posto giusto. Riprova.'
      );
    }
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

      {/* Aggiungi la visualizzazione della mappa con le coordinate attuali */}
      {coordinates.latitude !== 0 && coordinates.longitude !== 0 && (
        <MapScreen
          key={`${coordinates.latitude}-${coordinates.longitude}`}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      )}

      {/* Mostra il componente di verifica della foto se la risposta è corretta */}
      <PhotoVerification
        coordinates={coordinates}
        isAnswerCorrect={isCorrect}
        onPhotoVerified={handlePhotoVerified}
      />
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
});

export default RiddleScreen;
