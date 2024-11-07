// UserSessionManager.ts
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserSessionManager {
  sessionId: string | null = null;
  startTime: number | null = null;

  async startSession(userId: string, routeId: string): Promise<void> {
    // Reset della sessione precedente se esiste
    await this.resetSession();

    if (!this.sessionId) {
      this.startTime = Date.now();
      await AsyncStorage.setItem('session-data', JSON.stringify({ userId, routeId }));
    }
  }

  async completeSession(): Promise<number | null> {
    const sessionData = await AsyncStorage.getItem('session-data');
    if (sessionData && this.startTime) {
      const { userId, routeId } = JSON.parse(sessionData);
      const endTime = Date.now();
      const totalTime = endTime - this.startTime;

      const sessionDoc = await addDoc(collection(FIREBASE_DB, 'UserSessions'), {
        'user-id': userId,
        'route-id': routeId,
        'start-time': this.startTime,
        'end-time': endTime,
        'total-time': totalTime,
      });

      this.sessionId = sessionDoc.id;

      await this.resetSession();
      return totalTime;
    } else {
      console.error('Start time or session data not available.');
      return null;
    }
  }

  // Metodo per resettare la sessione
  async resetSession(): Promise<void> {
    await AsyncStorage.removeItem('session-data');
    this.startTime = null;
    this.sessionId = null;
  }
}

export default new UserSessionManager();
