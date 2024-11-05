import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserSessionManager {
  sessionId: string | null = null;

  async startSession(userId: string, routeId: string): Promise<void> {
    if (!this.sessionId) {
      const startTime = Date.now();
      // Salva la sessione in AsyncStorage
      await AsyncStorage.setItem(
        'session-data',
        JSON.stringify({ userId, routeId, startTime })
      );
    }
  }

  async completeSession(): Promise<number | null> {
    const sessionData = await AsyncStorage.getItem('session-data');
    if (sessionData) {
      const { userId, routeId, startTime } = JSON.parse(sessionData);
      const endTime = Date.now();

      // Calcola il tempo di completamento
      const totalTime = startTime ? endTime - startTime : null;

      // Salva la sessione completa su Firestore
      const sessionDoc = await addDoc(collection(FIREBASE_DB, 'UserSessions'), {
        'user-id': userId,
        'route-id': routeId,
        'start-time': startTime,
        'end-time': endTime,
        'total-time': totalTime,
      });

      this.sessionId = sessionDoc.id;

      return totalTime;
    }
    return null;
  }
}

export default new UserSessionManager();
