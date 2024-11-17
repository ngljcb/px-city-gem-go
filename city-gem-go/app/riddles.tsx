import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MapScreen from '@/components/MapScreen';
import PhotoVerification from '@/components/PhotoVerification';
import useRiddlesViewModel from '../viewmodels/RiddlesViewModel';
import { styles } from '../styles/Default';
import FloatingButton from '@/components/FloatingButton';

const Riddles = () => {
  const { routeId } = useLocalSearchParams();
  const routeIdStr = Array.isArray(routeId) ? routeId[0] : routeId;
  const { currentRiddle, userAnswer, setUserAnswer, isCorrect, checkAnswer, handlePhotoVerification, loading, completionTime } =
    useRiddlesViewModel(routeIdStr);

  const handleRouteSelect = (totalTime: string, routeId: string) => {
    router.push({
      pathname: '/results',
      params: { totalTime, routeId },
    });
  };

  React.useEffect(() => {
    if (completionTime !== null) {
      handleRouteSelect(completionTime.toString(), routeIdStr);
    }
  }, [completionTime]);

  const handleAnswerSubmit = async () => {
    const answerIsCorrect = await checkAnswer();

    if (answerIsCorrect) {
      Alert.alert('Corretto!', 'Ora scatta una foto per procedere.');
    } else {
      Alert.alert('Sbagliato', 'Riprova con un’altra risposta.');
      setUserAnswer(''); // Clear the input for the next attempt
    }
  };

  const handlePhotoVerificationCallback = async (success: boolean) => {
    const sessionCompleted = await handlePhotoVerification(success);
    if (!sessionCompleted) {
      if (success && completionTime === null) {
        Alert.alert('Foto verificata!', 'Passa al prossimo indovinello.', [
          {
            text: 'Avanti',
            onPress: () => {
              setUserAnswer('');
            },
          },
        ]);
      } else {
        Alert.alert('Errore', 'La foto non è stata scattata nel posto giusto. Riprova.');
      }
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/riddles-backdrop.png')} style={styles.container} resizeMode="cover">
      {loading ? (
        <Image source={require('@/assets/images/loading.gif')} style={styles.img} resizeMode="cover" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{isCorrect ? currentRiddle?.answer : currentRiddle?.question}</Text>
          {!isCorrect && <TextInput style={styles.input} placeholder="Inserisci la tua risposta" value={userAnswer} onChangeText={setUserAnswer} />}
          {!isCorrect && (
            <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
              <Text style={styles.buttonText}>Invia</Text>
            </TouchableOpacity>
          )}
          {isCorrect && currentRiddle && (
            <MapScreen
              key={`${currentRiddle.latitude}-${currentRiddle.longitude}`}
              latitude={currentRiddle.latitude}
              longitude={currentRiddle.longitude}
              isCorrect={isCorrect}
            />
          )}
          {isCorrect && (
            <PhotoVerification
              coordinates={currentRiddle ? { latitude: currentRiddle.latitude, longitude: currentRiddle.longitude } : { latitude: 0, longitude: 0 }}
              isAnswerCorrect={isCorrect}
              onPhotoVerified={handlePhotoVerificationCallback}
            />
          )}
        </View>
      )}
      <FloatingButton />
    </ImageBackground>
  );
};

export default Riddles;
