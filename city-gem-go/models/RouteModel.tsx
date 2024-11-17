import DatabaseManager from '../models/DatabaseManager';

export interface Route {
  routeId: string;
  routeName: string;
}

class RouteModel {
  private databaseManager: DatabaseManager;

  constructor() {
    this.databaseManager = new DatabaseManager();
  }

  async getLocalRoutes(): Promise<Route[]> {
    await this.databaseManager.fetchAndStoreNearbyRoutes();
    return await this.databaseManager.getLocalRoutes();
  }
}

export default RouteModel;
