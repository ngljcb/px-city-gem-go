import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserSessionManager {
  sessionId: string | null = null;
  startTime: number | null = null; // Variabile di stato locale

  async startSession(userId: string, routeId: string): Promise<void> {
    if (!this.sessionId) {
      // Imposta l'orario di inizio solo una volta
      this.startTime = Date.now();
      // Salva solo i dati dell'utente e della route in AsyncStorage
      await AsyncStorage.setItem('session-data', JSON.stringify({ userId, routeId }));
    }
  }

  async completeSession(): Promise<number | null> {
    const sessionData = await AsyncStorage.getItem('session-data');
    if (sessionData && this.startTime) {
      // Controlla che `startTime` sia disponibile
      const { userId, routeId } = JSON.parse(sessionData);
      const endTime = Date.now();
      const totalTime = endTime - this.startTime; // Calcolo del tempo totale

      // Salva la sessione completa su Firestore
      const sessionDoc = await addDoc(collection(FIREBASE_DB, 'UserSessions'), {
        'user-id': userId,
        'route-id': routeId,
        'start-time': this.startTime,
        'end-time': endTime,
        'total-time': totalTime,
      });

      this.sessionId = sessionDoc.id;

      // Rimuove i dati della sessione da AsyncStorage e reimposta `startTime`
      await AsyncStorage.removeItem('session-data');
      this.startTime = null; // Reset della variabile locale

      return totalTime;
    } else {
      console.error('Start time or session data not available.');
      return null;
    }
  }
}

export default new UserSessionManager();
