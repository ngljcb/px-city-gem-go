import * as Location from 'expo-location';
import AdventureDbManager from '../services/AdventureDbManager';
import { getDistance } from '../utils/distanceCalculator';
import FirebaseManager from '../services/FirebaseManager';

class AdventureManager {
  private localDatabaseManager: AdventureDbManager;
  private localFirebaseManager: FirebaseManager;

  constructor() {
    this.localFirebaseManager = new FirebaseManager();
    this.localDatabaseManager = new AdventureDbManager();
  }

  // Fetch dei percorsi vicini e delle domande associate e salvataggio nel DB locale
  async fetchAndStoreNearbyRoutes(): Promise<void> {
    try {
      console.log('Resetting the local database...');
      this.localDatabaseManager.resetDatabase();

      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error("Permessi per l'accesso alla posizione non concessi.");
      }

      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude: userLatitude, longitude: userLongitude } = userLocation.coords;
      console.log('User location:', { userLatitude, userLongitude });

      console.log('Fetching routes from Firebase...');
      const routes = await this.localFirebaseManager.getAllDocuments('Routes');
      console.log('Routes fetched from Firebase:', routes);

      const nearbyRoutes = routes.filter((route) => {
        if (route.gps && route.gps.latitude && route.gps.longitude) {
          const distance = getDistance(userLatitude, userLongitude, route.gps.latitude, route.gps.longitude);
          console.log(`Route ${route.id} is ${distance} meters away from the user.`);
          return distance <= 1000;
        }
        return false;
      });
      console.log('Nearby routes:', nearbyRoutes);

      for (const route of nearbyRoutes) {
        console.log('Saving route to local DB:', route);

        const questions = await this.localFirebaseManager.getOrderedDocuments(`Routes/${route.id}/Questions`, 'route_order');
        console.log(`Questions for route ${route.id} fetched from Firebase:`, questions);

        questions.forEach((question) => {
          console.log('Saving question to local DB:', question);

          this.localDatabaseManager.upsertAdventure(
            route.id, // adventure_id
            route.name || 'Senza nome', // adventure_name
            route.route_order || 0, // route_order
            question.id, // question_id
            question.question, // question
            question.answer, // answer
            question.gps.latitude, // latitude
            question.gps.longitude // longitude
          );
        });
      }

      console.log('Nearby routes and questions have been stored in the local database.');
    } catch (error) {
      console.error('Errore nel recupero o salvataggio dei percorsi e delle domande:', error);
      throw error;
    }
  }

  // Recupera i nomi e gli ID dei percorsi dal database locale
  async getLocalRoutes(): Promise<{ routeId: string; routeName: string }[]> {
    return new Promise((resolve) => {
      this.localDatabaseManager.getAdventures((adventures) => {
        const routes = adventures.map((adventure) => ({
          routeId: adventure.adventure_id,
          routeName: adventure.adventure_name,
        }));
        resolve(routes);
      });
    });
  }

  // Nuovo metodo per ottenere le domande di un percorso specifico
  async getQuestionsById(
    routeId: string
  ): Promise<{ question_id: string; question: string; answer: string; latitude: number; longitude: number; route_order: number }[]> {
    return new Promise((resolve) => {
      this.localDatabaseManager.getQuestionsById(routeId, (questions) => {
        resolve(questions);
      });
    });
  }
}

export default AdventureManager;
