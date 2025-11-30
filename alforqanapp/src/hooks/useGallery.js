import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getGallery } from '../services/galleryService';
import { GALLERY_TEXT } from '../../constants/texts/galleryTexts';

export function useGallery() {
  const isMounted = useRef(true);

  const [images, setImages] = useState([]); // full list
  const [loading, setLoading] = useState(true); // only for first load or forced refresh
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState('all');

  // Cleanup when unmounting (avoid memory leaks)
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // -----------------------------------------
  // CACHE-FIRST FETCH STRATEGY
  // -----------------------------------------
  const loadGallery = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { images: result, error } = await getGallery(forceRefresh);

      if (!isMounted.current) return;

      setImages(result || []);
      setError(error ? GALLERY_TEXT.errorOffline : null);
    } catch (_err) {
      if (isMounted.current) setError(GALLERY_TEXT.errorOffline);
    } finally {
      if (!isMounted.current) return;

      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load on mount (cache-first)
  useEffect(() => {
    loadGallery(false);
  }, [loadGallery]);

  // Pull-to-refresh
  const refresh = useCallback(() => {
    loadGallery(true);
  }, [loadGallery]);

  // -----------------------------------------
  // FILTERING (memoized)
  // -----------------------------------------
  const filteredImages = useMemo(() => {
    if (!images) return [];

    if (activeFilter === 'all') return images;

    const year = Number(activeFilter);
    if (Number.isNaN(year)) return images;

    return images.filter((img) => {
      const imageYear = Number(img?.year);
      if (!Number.isNaN(imageYear)) {
        return imageYear === year;
      }
      return String(img?.year) === String(activeFilter);
    });
  }, [images, activeFilter]);

  // -----------------------------------------
  // FILTER OPTIONS (derived from data)
  // -----------------------------------------
  const filters = useMemo(() => {
    const yearSet = new Set();

    images?.forEach((img) => {
      const value = Number(img?.year);
      if (!Number.isNaN(value)) {
        yearSet.add(value);
      }
    });

    const yearFilters = Array.from(yearSet)
      .sort((a, b) => b - a)
      .map((year) => ({
        id: String(year),
        label: String(year),
      }));

    return [
      { id: 'all', label: GALLERY_TEXT.allFilterLabel || 'All' },
      ...yearFilters,
    ];
  }, [images]);

  useEffect(() => {
    const hasActiveFilter = filters.some(
      (filter) => filter.id === activeFilter
    );
    if (!hasActiveFilter) {
      setActiveFilter('all');
    }
  }, [filters, activeFilter]);

  return {
    images,
    filteredImages,
    loading,
    error,
    refreshing,
    refresh,
    activeFilter,
    setActiveFilter,
    filters,
  };
}

export default useGallery;
