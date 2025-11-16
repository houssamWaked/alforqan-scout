import { useEffect, useState } from 'react';
import { getLatestEvents } from '../services/eventService';

export function useLatestEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // For now this uses mocked data from the service.
    setEvents(getLatestEvents());
  }, []);

  return events;
}

