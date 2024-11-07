import AdventureManager from '../models/AdventureManager';
import RiddleManager from '../models/RiddleManager';

class RiddleController {
  private riddleManager: RiddleManager;
  private adventureManager: AdventureManager;

  constructor() {
    this.riddleManager = new RiddleManager();
    this.adventureManager = new AdventureManager();
  }

  // Carica gli indovinelli per una specifica route
  async loadRiddles(routeId: string): Promise<void> {
    try {
      // Recupera le domande per la route specificata dal database
      const questions = await this.adventureManager.getQuestionsById(routeId);
      console.log('Questions loaded:', questions);

      // Imposta gli indovinelli nel RiddleManager
      this.riddleManager.setRiddles(questions); // Metodo che imposta gli indovinelli
    } catch (error) {
      console.error('Errore nel caricamento degli indovinelli:', error);
      throw new Error('Non è stato possibile caricare gli indovinelli.');
    }
  }

  // Ottiene l'indovinello corrente
  getCurrentRiddle() {
    return this.riddleManager.getCurrentRiddle();
  }

  // Passa all'indovinello successivo
  moveToNextRiddle() {
    this.riddleManager.moveToNextRiddle();
  }

  // Verifica la risposta dell'utente per l'indovinello corrente
  checkAnswer(userAnswer: string): boolean {
    return this.riddleManager.checkAnswer(userAnswer);
  }

  // Verifica se è il primo indovinello
  isFirstRiddle(): boolean {
    return this.riddleManager.isFirstRiddle();
  }

  // Verifica se è l'ultimo indovinello
  isLastRiddle(): boolean {
    return this.riddleManager.isLastRiddle();
  }
}

export default RiddleController;
