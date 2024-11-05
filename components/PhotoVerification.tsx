import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

interface PhotoVerificationProps {
  coordinates: { latitude: number; longitude: number };
  isAnswerCorrect: boolean;
  onPhotoVerified: (success: boolean) => void;
}

const PhotoVerification: React.FC<PhotoVerificationProps> = ({
  coordinates,
  isAnswerCorrect,
  onPhotoVerified,
}) => {
  const takePhoto = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert(
        'Permesso negato',
        'È necessario il permesso per accedere alla fotocamera.'
      );
      return;
    }

    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      Alert.alert(
        'Permesso negato',
        'È necessario il permesso per accedere alla posizione.'
      );
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
      verifyPhotoLocation(userLocation);
    }
  };

  const verifyPhotoLocation = (userLocation: {
    latitude: number;
    longitude: number;
  }) => {
    const distance = getDistanceFromLatLonInMeters(
      coordinates.latitude,
      coordinates.longitude,
      userLocation.latitude,
      userLocation.longitude
    );

    if (distance <= 50) {
      onPhotoVerified(true);
    } else {
      onPhotoVerified(false);
    }
  };

  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000; // Raggio della Terra in metri
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const deltaLat = (lat2 - lat1) * (Math.PI / 180);
    const deltaLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distanza in metri

    return distance;
  };

  return (
    <View>
      {isAnswerCorrect && (
        <Button title="Scatta una foto" onPress={takePhoto} />
      )}
    </View>
  );
};

export default PhotoVerification;
