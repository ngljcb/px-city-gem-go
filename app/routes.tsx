import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import RoutesController from '../controllers/RoutesController';
import { styles } from '../styles/Default';
import FloatingButton from '@/components/FloatingButton';

export default function Routes() {
  const [routes, setRoutes] = useState<{ routeId: string; routeName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const routesController = new RoutesController();

  // Carica le routes dal database locale
  useEffect(() => {
    routesController.fetchRoutes(setRoutes, setLoading).catch((error) => {
      Alert.alert('Errore', error.message);
    });

    // Aggiungi l'ascoltatore di stato dell'app
    routesController.addAppStateListener();

    // Rimuovi l'ascoltatore al dismount del componente
    return () => {
      routesController.removeAppStateListener();
    };
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
      <FloatingButton />
    </ImageBackground>
  );
}
