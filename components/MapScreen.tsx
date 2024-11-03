import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapScreenProps {
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC<MapScreenProps> = ({ latitude, longitude }) => {
  const INITIAL_REGION = {
    latitude,
    longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

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
  },
});

export default MapScreen;
