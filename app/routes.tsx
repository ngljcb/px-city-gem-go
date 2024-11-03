import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Routes() {
  const [routes, setRoutes] = useState<any[]>([]);
  const router = useRouter(); // Usa il router di Expo Router

  // Carica le routes da Firestore
  useEffect(() => {
    const fetchRoutes = async () => {
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
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Seleziona una route:</Text>
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.routeButton}
              onPress={() => handleRouteSelect(item.id)}
            >
              <Text style={styles.routeText}>
                {item.name || 'Route senza nome'}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    maxWidth: 400, // Limita la larghezza del contenuto
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  routeButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  routeText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
