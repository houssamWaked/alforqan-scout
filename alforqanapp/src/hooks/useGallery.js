import { useCallback, useEffect, useMemo, useState } from 'react';
import { getGallery } from '../services/galleryService';
import { GALLERY_TEXT, GALLERY_FILTERS } from '../../constants/texts/galleryTexts';

export function useGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchGallery = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      try {
        const { images: result, error: err } = await getGallery(forceRefresh);
        setImages(result || []);
        setError(err ? GALLERY_TEXT.errorOffline : null);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const refresh = () => {
    setRefreshing(true);
    fetchGallery(true);
  };

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return images;
    const year = parseInt(activeFilter, 10);
    if (Number.isNaN(year)) return images;
    return images.filter((img) => img.year === year);
  }, [activeFilter, images]);

  return {
    images,
    filteredImages,
    loading,
    error,
    refreshing,
    refresh,
    activeFilter,
    setActiveFilter,
    filters: GALLERY_FILTERS,
  };
}

export default useGallery;
