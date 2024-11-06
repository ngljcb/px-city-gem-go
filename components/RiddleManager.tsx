import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

class RiddleManager {
  private riddles: any[] = [];
  private currentIndex: number = 0;

  async loadRiddles(routeId: string): Promise<void> {
    try {
      const riddlesQuery = query(collection(FIREBASE_DB, `/Routes/${routeId}/Questions`), orderBy('route_order', 'asc'));

      const querySnapshot = await getDocs(riddlesQuery);
      this.riddles = querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Errore nel caricamento degli indovinelli:', error);
      throw new Error('Non è stato possibile caricare gli indovinelli.');
    }
  }

  getCurrentRiddle() {
    return this.riddles[this.currentIndex] || null;
  }

  moveToNextRiddle() {
    if (this.currentIndex < this.riddles.length - 1) {
      this.currentIndex += 1;
    }
  }

  checkAnswer(userAnswer: string): boolean {
    const currentRiddle = this.getCurrentRiddle();
    return currentRiddle && userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase().trim();
  }

  isFirstRiddle(): boolean {
    return this.currentIndex === 0;
  }

  isLastRiddle(): boolean {
    return this.currentIndex === this.riddles.length - 1;
  }
}

export default RiddleManager;
