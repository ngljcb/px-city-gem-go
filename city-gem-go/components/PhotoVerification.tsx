import React from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { getDistance } from '../utils/distanceCalculator';
import { styles } from '../styles/Default';

interface PhotoVerificationProps {
  coordinates: { latitude: number; longitude: number };
  isAnswerCorrect: boolean;
  onPhotoVerified: (success: boolean) => void;
}

const PhotoVerification: React.FC<PhotoVerificationProps> = ({ coordinates, isAnswerCorrect, onPhotoVerified }) => {
  const takePhoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert('Permesso negato', 'È necessario il permesso per accedere alla fotocamera.');
      return;
    }

    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      Alert.alert('Permesso negato', 'È necessario il permesso per accedere alla posizione.');
      return;
    }

    // Ottieni la posizione attuale dell'utente
    const location = await Location.getCurrentPositionAsync({});
    const userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      verifyPhotoLocation(userLocation, result.assets[0].uri);
    }
  };

  const verifyPhotoLocation = async (userLocation: { latitude: number; longitude: number }, photoUri: string) => {
    const distance = getDistance(coordinates.latitude, coordinates.longitude, userLocation.latitude, userLocation.longitude);

    if (distance <= 50) {
      onPhotoVerified(true);
      await savePhotoToGallery(photoUri);
    } else {
      onPhotoVerified(false);
    }
  };

  const savePhotoToGallery = async (photoUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(photoUri);
    } else {
      Alert.alert('Permesso negato', 'Non è stato possibile salvare la foto nella galleria.');
    }
  };

  return (
    <View>
      {isAnswerCorrect && (
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Scatta una foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PhotoVerification;
