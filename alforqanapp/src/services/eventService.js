import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cache_events';

function parseImages(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      // fall through to comma split
    }

    return trimmed
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeEvents(rows = []) {
  return rows.map((item) => {
    const imageCandidates = [
      parseImages(item.images),
      parseImages(item.images_url),
      parseImages(item.image_urls),
    ];
    const images =
      imageCandidates.find((list) => Array.isArray(list) && list.length) || [];

    const primaryImage = item.image || item.image_url || images?.[0] || null;

    return {
      ...item,
      createdAt: item.created_at || null,
      updatedAt: item.updated_at || null,
      eventDateRaw: item.event_date || item.date || null,
      title: item.title || item.name || '',
      description: item.description || item.details || '',
      image: primaryImage,
      images,
      date: item.date || item.event_date || null,
      time: item.time || item.event_time || '',
      location: item.location || item.place || '',
      leader: item.leader || item.responsible || '',
      program: Array.isArray(item.program) ? item.program : [],
      equipment: Array.isArray(item.equipment) ? item.equipment : [],
    };
  });
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
  const { limit, forceRefresh = false, onlyUpcoming = false } = options;

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

    if (onlyUpcoming) {
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      query = query.gte('event_date', todayString);
    }

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
  const { limit = 5, forceRefresh = false, onlyUpcoming = false } = options;
  return getEvents({ limit, forceRefresh, onlyUpcoming });
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
