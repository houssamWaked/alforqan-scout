// src/hooks/useLatestEvents.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { getLatestEvents } from '../services/eventService';

export function useLatestEvents() {
  const isMounted = useRef(true);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { events } = await getLatestEvents({ limit: 5 });
      if (!isMounted.current) return;
      setData(events || []);
      setError(null);
    } catch (err) {
      if (isMounted.current) {
        setError(err || true);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      isMounted.current = false;
    };
  }, [load]);

  return {
    data,
    loading,
    error,
    refresh: load,
  };
}

export default useLatestEvents;
