import { useState, useEffect } from 'react';

import RiddleModel, { Riddle } from '../models/RiddleModel';
import UserSessionManager from '../models/UserSessionManager';

import NotificationHandler from '../services/NotificationHandler';

import { getAuth } from 'firebase/auth';

const useRiddlesViewModel = (routeId: string) => {
  const riddleModel = new RiddleModel();
  const notificationHandler = new NotificationHandler();

  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRiddles = async () => {
      setLoading(true);
      try {
        const loadedRiddles = await riddleModel.loadRiddles(routeId);
        setRiddles(loadedRiddles);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Error loading riddles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (routeId) fetchRiddles();

    notificationHandler.addAppStateListener('Torna a giocare!', 'Non fermarti ora! Completa la tua avventura.');

    return () => {
      notificationHandler.removeAppStateListener();
    };
  }, [routeId]);

  const getCurrentRiddle = () => {
    return riddles[currentIndex] || null;
  };

  const moveToNextRiddle = () => {
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsCorrect(false);
      setUserAnswer('');
      setPhotoVerified(false);
    }
  };

  const checkAnswer = async (): Promise<boolean> => {
    const currentRiddle = getCurrentRiddle();

    if (currentRiddle && userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase().trim()) {
      setIsCorrect(true);
      return true;
    } else {
      setIsCorrect(false);
      setUserAnswer('');
      return false;
    }
  };

  const isFirstRiddle = () => {
    return currentIndex === 0;
  };

  const isLastRiddle = () => {
    return currentIndex === riddles.length - 1;
  };

  const handlePhotoVerification = async (success: boolean): Promise<boolean> => {
    if (success) {
      if (isLastRiddle()) {
        const totalTime = await UserSessionManager.completeSession();
        setCompletionTime(totalTime);
        return true;
      } else {
        if (isFirstRiddle() && user) {
          await UserSessionManager.startSession(user.uid, routeId);
        }
        moveToNextRiddle();
        return false;
      }
    }
    return false;
  };

  return {
    currentRiddle: getCurrentRiddle(),
    userAnswer,
    setUserAnswer,
    isCorrect,
    checkAnswer,
    handlePhotoVerification,
    loading,
    photoVerified,
    completionTime,
  };
};

export default useRiddlesViewModel;
