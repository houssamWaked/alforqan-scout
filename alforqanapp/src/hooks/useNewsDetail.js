// src/hooks/useNewsDetail.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NEWS_TEXT } from '../../constants/texts/newsTexts';
import { getNewsById } from '../services/newsService';

export function useNewsDetail(id) {
  const isMounted = useRef(true);

  const [item, setItem] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const { news, error: fetchError } = await getNewsById(id, {
          forceRefresh,
        });

        if (!isMounted.current) return;

        setItem(news || null);
        setImages(
          news?.images?.filter(Boolean) ||
            (news?.image ? [news.image] : [])
        );
        setError(fetchError ? NEWS_TEXT.detailError : null);
      } catch {
        if (isMounted.current) setError(NEWS_TEXT.detailError);
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
      item,
      images,
    }),
    [item, images]
  );

  return {
    data,
    loading,
    error,
    refresh,
    refreshing,
  };
}

export default useNewsDetail;
