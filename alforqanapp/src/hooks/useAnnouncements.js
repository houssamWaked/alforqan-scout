// src/hooks/useAnnouncements.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { HOME_TEXT } from '../../constants/texts/homeTexts';
import { getPinnedAnnouncement } from '../services/announcementService';

export function useAnnouncements() {
  const isMounted = useRef(true);

  const [data, setData] = useState(HOME_TEXT.fallbackAnnounce);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const text = await getPinnedAnnouncement();
      if (!isMounted.current) return;
      if (text) {
        setData(text);
      }
      setError(null);
    } catch (err) {
      if (isMounted.current) {
        // keep fallback text, just flag error
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

export default useAnnouncements;
