import { useCallback, useEffect, useRef, useState } from 'react';
import { getAbout } from '../services/aboutService';
import { ABOUT_TEXT } from '../../constants/texts/aboutTexts';

export function useAboutUs() {
  const isMounted = useRef(true);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { about, error: fetchError } = await getAbout(forceRefresh);

      if (!isMounted.current) return;

      setData(about || null);
      setError(
        fetchError && !about
          ? ABOUT_TEXT.errorMessage
          : null
      );
    } catch {
      if (isMounted.current)
        setError(ABOUT_TEXT.errorMessage);
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

  return {
    data,
    loading,
    error,
    refresh,
    refreshing,
  };
}

export default useAboutUs;
