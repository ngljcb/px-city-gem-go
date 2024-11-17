import * as Notifications from 'expo-notifications';
import { AppState, AppStateStatus, Platform, Alert } from 'react-native';

class NotificationHandler {
  private appState: AppStateStatus = AppState.currentState;
  private appStateSubscription: { remove: () => void } | null = null;
  private backgroundTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.configureNotificationHandler();
  }

  configureNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You must grant permissions to receive notifications.');
    }
  }

  async scheduleNotification(title: string, body: string, seconds: number) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: { seconds: seconds },
    });
  }

  handleAppStateChange = (nextAppState: AppStateStatus, title: string, message: string) => {
    if (this.appState === 'active' && nextAppState === 'background') {
      this.backgroundTimeout = setTimeout(() => {
        this.scheduleNotification(title, message, 0);
      }, 10000);
    } else if (nextAppState === 'active') {
      if (this.backgroundTimeout) {
        clearTimeout(this.backgroundTimeout);
        this.backgroundTimeout = null;
      }
    }

    this.appState = nextAppState;
  };

  addAppStateListener(title: string, message: string) {
    this.appStateSubscription = AppState.addEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState, title, message));
  }

  removeAppStateListener() {
    this.appStateSubscription?.remove();
  }
}

export default NotificationHandler;
