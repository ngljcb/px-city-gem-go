// RiddleManager.ts
class RiddleManager {
  private riddles: any[] = [];
  private currentIndex: number = 0;

  // Imposta gli indovinelli
  setRiddles(riddles: any[]) {
    this.riddles = riddles;
    this.currentIndex = 0; // Resetta l'indice
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
