import { useState, useEffect } from 'react';
import ScoreModel, { Score } from '../models/ScoreboardModel';

const useScoreboardViewModel = (routeIdStr: string) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const topScores = await ScoreModel.fetchTopScores(routeIdStr);
        setScores(topScores);
      } catch (error) {
        console.error('Errore nel caricamento della classifica:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [routeIdStr]);

  return { scores, loading };
};

export default useScoreboardViewModel;
