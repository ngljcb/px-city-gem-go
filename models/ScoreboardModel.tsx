import FirebaseManager from '../services/FirebaseManager';

export interface Score {
  'user-name': string;
  'total-time': number;
  'route-id': string;
}

class ScoreboardModel {
  static async fetchTopScores(routeIdStr: string): Promise<Score[]> {
    const firebaseManager = new FirebaseManager();
    const topScores = await firebaseManager.getOrderedDocuments('UserSessions', 'total-time');
    return topScores.filter((item: Score) => item['route-id'] === routeIdStr).slice(0, 10);
  }
}

export default ScoreboardModel;
