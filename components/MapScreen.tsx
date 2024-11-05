import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapScreenProps {
  latitude: number;
  longitude: number;
  isCorrect: boolean; // Aggiungi isCorrect come prop
}

const MapScreen: React.FC<MapScreenProps> = ({
  latitude,
  longitude,
  isCorrect,
}) => {
  const INITIAL_REGION = {
    latitude,
    longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  // Rendi visibile la mappa solo se isCorrect è true
  if (!isCorrect) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="Posizione"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
});

export default MapScreen;
