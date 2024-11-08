import DatabaseManager from '../models/DatabaseManager';

export interface Riddle {
  question: string;
  answer: string;
  latitude: number;
  longitude: number;
  route_order: number;
}

class RiddleModel {
  private databaseManager: DatabaseManager;

  constructor() {
    this.databaseManager = new DatabaseManager();
  }

  // Load riddles for a specific route from the database
  async loadRiddles(routeId: string): Promise<Riddle[]> {
    return await this.databaseManager.getQuestionsById(routeId);
  }
}

export default RiddleModel;
