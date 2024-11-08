import * as Location from 'expo-location';

import AdventureDbManager from '../services/AdventureDbManager';
import FirebaseManager from '../services/FirebaseManager';

import { getDistance } from '../utils/distanceCalculator';

class DatabaseManager {
  private localDatabaseManager: AdventureDbManager;
  private localFirebaseManager: FirebaseManager;

  constructor() {
    this.localFirebaseManager = new FirebaseManager();
    this.localDatabaseManager = new AdventureDbManager();
  }

  // Fetch nearby routes and associated questions, then save them in the local database
  async fetchAndStoreNearbyRoutes(): Promise<void> {
    try {
      console.log('Resetting the local database...');
      this.localDatabaseManager.resetDatabase();

      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permissions not granted.');
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
            route.name || 'No name', // adventure_name
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
      console.error('Error fetching or saving routes and questions:', error);
      throw error;
    }
  }

  // Retrieve the names and IDs of routes from the local database
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

  // Get questions for a specific route
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

export default DatabaseManager;
