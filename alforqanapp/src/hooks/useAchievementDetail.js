// useAchievementDetail.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';
import { getAchievementById } from '../services/achievementsService';

export function useAchievementDetail(id) {
  const isMounted = useRef(true);

  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const { achievement: data, error: fetchError } =
          await getAchievementById(id, { forceRefresh });

        if (!isMounted.current) return;

        setAchievement(data || null);
        setError(fetchError ? ACHIEVEMENTS_TEXT.detailError : null);
      } catch {
        if (isMounted.current) setError(ACHIEVEMENTS_TEXT.detailError);
      } finally {
        if (!isMounted.current) return;

        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  useEffect(() => {
    load(false);
    return () => {
      isMounted.current = false;
    };
  }, [load]);

  const refresh = useCallback(() => {
    load(true);
  }, [load]);

  const data = useMemo(
    () => ({
      achievement,
      images:
        achievement?.images?.filter(Boolean) ||
        (achievement?.image ? [achievement.image] : []),
    }),
    [achievement]
  );

  return {
    data,
    loading,
    error,
    refresh,
    refreshing,
  };
}

export default useAchievementDetail;
