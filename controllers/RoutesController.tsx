import AdventureManager from '../models/AdventureManager';
import UserSessionManager from '../models/UserSessionManager';
import { scheduleNotification } from '../services/NotificationService';
import { AppState, AppStateStatus } from 'react-native';

class RoutesController {
  private adventureManager: AdventureManager;
  private appState: AppStateStatus = AppState.currentState;
  private appStateSubscription: { remove: () => void } | null = null;
  private backgroundTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.adventureManager = new AdventureManager();
  }

  // Metodo per caricare le rotte
  async fetchRoutes(setRoutes: (routes: { routeId: string; routeName: string }[]) => void, setLoading: (loading: boolean) => void) {
    setLoading(true);
    try {
      console.log('Fetching and storing nearby routes...');
      await this.adventureManager.fetchAndStoreNearbyRoutes();
      console.log('Nearby routes fetched and stored.');

      console.log('Loading routes from local database...');
      const localRoutes = await this.adventureManager.getLocalRoutes();
      console.log('Routes loaded:', localRoutes);
      setRoutes(localRoutes);

      // Resetta la sessione utente ogni volta che si carica la schermata delle rotte
      await UserSessionManager.resetSession();
    } catch (error) {
      console.error('Errore nel caricamento delle routes:', error);
      throw new Error('Non è stato possibile caricare le routes.');
    } finally {
      setLoading(false);
    }
  }

  // Gestione della notifica quando l'app va in background
  handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (this.appState === 'active' && nextAppState === 'background') {
      // Imposta un timer per programmare la notifica solo se rimane in background
      this.backgroundTimeout = setTimeout(() => {
        scheduleNotification(
          'Torna a giocare!',
          'Non fermarti ora! Completa la tua avventura.',
          10 // 10 secondi
        );
      }, 30000); // Ad esempio, attende 5 secondi prima di inviare la notifica
    } else if (nextAppState === 'active') {
      // Annulla il timer se l'app ritorna a `active`
      if (this.backgroundTimeout) {
        clearTimeout(this.backgroundTimeout);
        this.backgroundTimeout = null;
      }
    }

    this.appState = nextAppState;
  };

  // Aggiungi l'ascoltatore di stato dell'app
  addAppStateListener() {
    this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
  }

  // Rimuovi l'ascoltatore di stato dell'app
  removeAppStateListener() {
    this.appStateSubscription?.remove();
  }
}

export default RoutesController;
