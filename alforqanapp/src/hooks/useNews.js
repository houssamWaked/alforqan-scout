// src/hooks/useNews.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { NEWS_TEXT } from '../../constants/texts/newsTexts';
import { getNews } from '../services/newsService';
import { notifyForNews } from '../services/notificationService';

export function useNews() {
  const isMounted = useRef(true);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { news, error: fetchError } = await getNews(forceRefresh);
      if (!isMounted.current) return;

      const nonPinned = news?.filter((item) => !item.pinned) || [];
      setData(nonPinned);
      setError(fetchError ? NEWS_TEXT.listError : null);

      notifyForNews(nonPinned).catch(() => {});
    } catch {
      if (isMounted.current) {
        setError(NEWS_TEXT.listError);
      }
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

export default useNews;
