// useEvents.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EVENTS_TEXT } from '../../constants/texts/eventsTexts';
import { getEvents } from '../services/eventService';
import { getEventTypeLabel, isUpcomingEvent } from '../constants/events';

export function useEvents() {
  const isMounted = useRef(true);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const loadEvents = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { events: data, error: fetchError } = await getEvents({
        forceRefresh,
      });

      if (!isMounted.current) return;

      setEvents(Array.isArray(data) ? data : []);
      setError(fetchError ? EVENTS_TEXT.listError : null);
    } catch {
      if (isMounted.current) setError(EVENTS_TEXT.listError);
    } finally {
      if (!isMounted.current) return;

      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEvents(false);
    return () => {
      isMounted.current = false;
    };
  }, [loadEvents]);

  const refresh = useCallback(() => {
    loadEvents(true);
  }, [loadEvents]);

  const filters = useMemo(() => {
    const baseFilters = (EVENTS_TEXT.filters || []).filter((filter) =>
      ['all', 'upcoming', 'past'].includes(filter.id)
    );

    const typeFilters = Array.from(
      new Set(
        (events || [])
          .map((item) => item?.type)
          .filter(
            (type) => type && !['all', 'upcoming', 'past'].includes(type)
          )
      )
    ).map((type) => ({
      id: type,
      label: getEventTypeLabel(type),
    }));

    return [...baseFilters, ...typeFilters];
  }, [events]);

  const filterIds = useMemo(
    () => filters.map((filter) => filter.id),
    [filters]
  );

  useEffect(() => {
    if (!filterIds.includes(activeFilter)) {
      setActiveFilter('all');
    }
  }, [activeFilter, filterIds]);

  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) return [];

    switch (activeFilter) {
      case 'upcoming':
        return events.filter((item) => isUpcomingEvent(item.date));
      case 'past':
        return events.filter((item) => !isUpcomingEvent(item.date));
      case 'all':
        return events;
      default:
        return events.filter((item) => item.type === activeFilter);
    }
  }, [activeFilter, events]);

  return {
    data: events,
    filteredEvents,
    loading,
    error,
    refresh,
    refreshing,
    filters,
    activeFilter,
    setActiveFilter,
  };
}

export default useEvents;
