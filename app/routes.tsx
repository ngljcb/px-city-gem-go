import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { styles } from '../constants/styles/Default';

export default function Routes() {
  const [routes, setRoutes] = useState<any[]>([]);
  const router = useRouter(); // Usa il router di Expo Router
  const [loading, setLoading] = useState(true);

  // Carica le routes da Firestore
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true); // Imposta loading a true quando inizia la richiesta
      try {
        const routesCollection = collection(FIREBASE_DB, '/Routes');
        const querySnapshot = await getDocs(routesCollection);
        const routesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoutes(routesArray);
      } catch (error) {
        console.error('Errore nel caricamento delle routes:', error);
        Alert.alert('Errore', 'Non è stato possibile caricare le routes.');
      } finally {
        setLoading(false); // Imposta loading a false al termine della richiesta
      }
    };

    fetchRoutes();
  }, []);

  const handleRouteSelect = (routeId: string) => {
    // Naviga alla schermata RiddleScreen passando l'ID della route
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
          <Text style={styles.title}>Seleziona una route:</Text>
          <FlatList
            data={routes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button} onPress={() => handleRouteSelect(item.id)}>
                <Text style={styles.buttonText}>{item.name || 'Route senza nome'}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ImageBackground>
  );
}
