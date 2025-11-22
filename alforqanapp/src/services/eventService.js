import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cache_events';

function normalizeEvents(rows = []) {
  return rows.map((item) => ({
    ...item,
    title: item.title || item.name || '',
    description: item.description || item.details || '',
    image: item.image || item.image_url || null,
    date: item.date || item.event_date || null,
    time: item.time || item.event_time || '',
    location: item.location || item.place || '',
    leader: item.leader || item.responsible || '',
    program: Array.isArray(item.program) ? item.program : [],
    equipment: Array.isArray(item.equipment) ? item.equipment : [],
  }));
}

async function readCache() {
  const cached = await AsyncStorage.getItem(CACHE_KEY);
  if (!cached) return [];
  try {
    return JSON.parse(cached);
  } catch {
    return [];
  }
}

export async function getEvents(options = {}) {
  const { limit, forceRefresh = false } = options;

  let events = [];
  let error = null;
  let cached = [];

  try {
    cached = await readCache();
    if (!forceRefresh && cached.length) {
      events = cached;
    }

    let query = supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error: supabaseError } = await query;

    if (supabaseError) {
      throw supabaseError;
    }

    events = normalizeEvents(data || []);
    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify(events)
    );
  } catch (err) {
    error = err;

    if (!events.length && cached.length) {
      events = cached;
    }
  }

  return { events, error };
}

export async function getLatestEvents(options = {}) {
  const { limit = 5, forceRefresh = false } = options;
  return getEvents({ limit, forceRefresh });
}

export async function getEventById(id, options = {}) {
  if (!id) return { event: null, error: null };

  const { forceRefresh = false } = options;
  const { events, error } = await getEvents({ forceRefresh });

  const targetId = String(id);
  const event =
    events.find((item) => String(item.id) === targetId) || null;

  return { event, error };
}

export default getEvents;
