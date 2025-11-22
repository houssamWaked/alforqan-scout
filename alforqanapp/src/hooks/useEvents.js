// useEvents.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EVENTS_TEXT } from '../../constants/texts/eventsTexts';
import { getEvents } from '../services/eventService';
import { isUpcomingEvent } from '../constants/events';

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

      setEvents(data || []);
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

  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) return [];

    switch (activeFilter) {
      case 'upcoming':
        return events.filter((item) => isUpcomingEvent(item.date));
      case 'past':
        return events.filter((item) => !isUpcomingEvent(item.date));
      case 'camp':
      case 'competition':
      case 'service':
      case 'training':
        return events.filter((item) => item.type === activeFilter);
      case 'all':
      default:
        return events;
    }
  }, [activeFilter, events]);

  return {
    data: events,
    filteredEvents,
    loading,
    error,
    refresh,
    refreshing,
    filters: EVENTS_TEXT.filters,
    activeFilter,
    setActiveFilter,
  };
}

export default useEvents;
