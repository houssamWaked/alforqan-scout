// useEventDetail.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EVENTS_TEXT } from '../../constants/texts/eventsTexts';
import { getEventById } from '../services/eventService';

export function useEventDetail(id) {
  const isMounted = useRef(true);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadEvent = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const { event: data, error: fetchError } = await getEventById(id, {
          forceRefresh,
        });

        if (!isMounted.current) return;

        setEvent(data || null);
        setError(fetchError ? EVENTS_TEXT.detailError : null);
      } catch {
        if (isMounted.current) setError(EVENTS_TEXT.detailError);
      } finally {
        if (!isMounted.current) return;

        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  useEffect(() => {
    loadEvent(false);
    return () => {
      isMounted.current = false;
    };
  }, [loadEvent]);

  const refresh = useCallback(() => {
    loadEvent(true);
  }, [loadEvent]);

  const data = useMemo(
    () => ({
      event,
    }),
    [event]
  );

  return {
    data,
    loading,
    error,
    refresh,
    refreshing,
  };
}

export default useEventDetail;
