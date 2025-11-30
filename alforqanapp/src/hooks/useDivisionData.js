import { useEffect, useRef, useState, useCallback } from 'react';
import { getDivisionData } from '../services/divisionService';
import { getDivisionById } from '../constants/divisions';

export function useDivisionData(slug) {
  const isMounted = useRef(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (currentSlug = slug) => {
      if (!currentSlug) return;

      setLoading(true);
      setError(null);

      try {
        const { division, leaders, members, error: fetchError } =
          await getDivisionData(currentSlug);

        if (!isMounted.current) return;

        const fallback = getDivisionById(currentSlug) || {};
        const mergedDivision = {
          ...fallback,
          ...division,
          skills: division?.skills?.length
            ? division.skills
            : fallback.skills || [],
          activities: division?.activities?.length
            ? division.activities
            : fallback.activities || [],
          icon: division?.icon || fallback.icon || null,
          heroImage:
            division?.heroImage || division?.hero_image || fallback.heroImage,
        };

        setData({
          division: mergedDivision,
          leaders: leaders || [],
          members: members || [],
        });

        setError(fetchError || null);
      } catch (err) {
        if (isMounted.current) setError(err);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [slug]
  );

  useEffect(() => {
    load(slug);
    return () => {
      isMounted.current = false;
    };
  }, [load, slug]);

  return {
    data,
    loading,
    error,
    refresh: () => load(slug),
  };
}

export default useDivisionData;
