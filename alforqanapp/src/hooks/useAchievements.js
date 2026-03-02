// hooks/useAchievements.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACHIEVEMENT_FILTERS,
  ACHIEVEMENTS_TEXT,
} from '../../constants/texts/achievementTexts';
import { getAchievements } from '../services/achievementsService';
import { ACHIEVEMENT_FILTER_TYPE } from '../constants/achievementTypes';

export function useAchievements() {
  const isMounted = useRef(true);

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(ACHIEVEMENT_FILTER_TYPE);

  const load = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { achievements: data, error: fetchError } = await getAchievements({
        forceRefresh,
      });

      if (!isMounted.current) return;

      setAchievements(data || []);
      setError(fetchError ? ACHIEVEMENTS_TEXT.listError : null);
    } catch {
      if (isMounted.current) setError(ACHIEVEMENTS_TEXT.listError);
    } finally {
      if (!isMounted.current) return;

      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
    return () => {
      isMounted.current = false;
    };
  }, [load]);

  const refresh = useCallback(() => {
    load(true);
  }, [load]);

  const filteredAchievements = useMemo(() => {
    if (activeFilter === ACHIEVEMENT_FILTER_TYPE) return achievements;
    return achievements.filter((a) => a.type === activeFilter);
  }, [activeFilter, achievements]);

  return {
    data: achievements,
    filteredAchievements,
    loading,
    error,
    refresh,
    refreshing,
    activeFilter,
    setActiveFilter,
    filters: ACHIEVEMENT_FILTERS,
  };
}

export default useAchievements;
