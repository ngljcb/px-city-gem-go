import { useState, useEffect } from 'react';
import RouteModel, { Route } from '../models/RouteModel';
import NotificationHandler from '../services/NotificationHandler';

const useRoutesViewModel = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const routeModel = new RouteModel();
  const notificationHandler = new NotificationHandler();

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const localRoutes = await routeModel.getLocalRoutes();
        setRoutes(localRoutes);
      } catch (error) {
        console.error('Error loading routes:', error);
        throw new Error('Unable to load routes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();

    notificationHandler.addAppStateListener('Torna a giocare!', 'Non fermarti ora! Inizia la tua avventura.');

    return () => {
      notificationHandler.removeAppStateListener();
    };
  }, []);

  return { routes, loading };
};

export default useRoutesViewModel;
