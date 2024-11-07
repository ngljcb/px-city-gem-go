import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AdventureManager from '../models/AdventureManager';
import { styles } from '../constants/styles/Default';

export default function Routes() {
  const [routes, setRoutes] = useState<{ routeId: string; routeName: string }[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Carica le routes dal database locale
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const adventureManager = new AdventureManager();

        // Assicuriamo che i percorsi vicini siano aggiornati nel database locale
        console.log('Fetching and storing nearby routes...');
        await adventureManager.fetchAndStoreNearbyRoutes();
        console.log('Nearby routes fetched and stored.');

        // Carichiamo le routes dal database locale
        console.log('Loading routes from local database...');
        const localRoutes = await adventureManager.getLocalRoutes();
        console.log('Routes loaded:', localRoutes);
        setRoutes(localRoutes);
      } catch (error) {
        console.error('Errore nel caricamento delle routes:', error);
        Alert.alert('Errore', 'Non è stato possibile caricare le routes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const handleRouteSelect = (routeId: string) => {
    router.push({
      pathname: '/riddles',
      params: { routeId },
    });
  };

  return (
    <ImageBackground source={require('@/assets/images/riddles-backdrop.gif')} style={styles.container} resizeMode="cover">
      {loading ? (
        <Image source={require('@/assets/images/loading.gif')} style={styles.img} resizeMode="cover" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>Seleziona la tua avventura!</Text>
          <FlatList
            data={routes}
            keyExtractor={(item) => item.routeId}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button} onPress={() => handleRouteSelect(item.routeId)}>
                <Text style={styles.buttonText}>{item.routeName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ImageBackground>
  );
}
