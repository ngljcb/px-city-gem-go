import FirebaseManager from '../services/FirebaseManager'; // Assicurati di importare FirebaseManager
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserSessionManager {
  startTime: number | null = null;
  private firebaseManager: FirebaseManager;

  constructor() {
    this.firebaseManager = new FirebaseManager(); // Inizializza FirebaseManager
  }

  async startSession(userId: string, routeId: string): Promise<void> {
    // Reset della sessione precedente se esiste
    await this.resetSession();

    this.startTime = Date.now();
    await AsyncStorage.setItem('session-data', JSON.stringify({ userId, routeId }));
  }

  async completeSession(): Promise<number | null> {
    const sessionData = await AsyncStorage.getItem('session-data');
    if (sessionData && this.startTime) {
      const { userId, routeId } = JSON.parse(sessionData);
      const endTime = Date.now();
      const totalTime = endTime - this.startTime;

      // Usa il metodo addDocument di FirebaseManager per aggiungere il documento
      try {
        await this.firebaseManager.addDocument('UserSessions', {
          'user-id': userId,
          'route-id': routeId,
          'start-time': this.startTime,
          'end-time': endTime,
          'total-time': totalTime,
        });

        await this.resetSession();
        return totalTime;
      } catch (error) {
        console.error('Errore durante il completamento della sessione:', error);
        return null;
      }
    } else {
      console.error('Start time or session data not available.');
      return null;
    }
  }

  // Metodo per resettare la sessione
  async resetSession(): Promise<void> {
    await AsyncStorage.removeItem('session-data');
    this.startTime = null;
  }
}

export default new UserSessionManager();
