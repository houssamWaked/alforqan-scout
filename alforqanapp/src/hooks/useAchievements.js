// hooks/useAchievements.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';
import { getAchievements } from '../services/achievementsService';
import {
  ACHIEVEMENT_FILTER_TYPE,
  getAchievementTypeLabel,
} from '../constants/achievementTypes';

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

  const filters = useMemo(() => {
    const typeFilters = Array.from(
      new Set(
        (achievements || [])
          .map((item) => item?.type)
          .filter((type) => type && type !== ACHIEVEMENT_FILTER_TYPE)
      )
    ).map((type) => ({
      id: type,
      label: getAchievementTypeLabel(type),
    }));

    return [
      { id: ACHIEVEMENT_FILTER_TYPE, label: 'الكل' },
      ...typeFilters,
    ];
  }, [achievements]);

  useEffect(() => {
    const hasActiveFilter = filters.some((filter) => filter.id === activeFilter);
    if (!hasActiveFilter) {
      setActiveFilter(ACHIEVEMENT_FILTER_TYPE);
    }
  }, [activeFilter, filters]);

  return {
    data: achievements,
    filteredAchievements,
    loading,
    error,
    refresh,
    refreshing,
    activeFilter,
    setActiveFilter,
    filters,
  };
}

export default useAchievements;
