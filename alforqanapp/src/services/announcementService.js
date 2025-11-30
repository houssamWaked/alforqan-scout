import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOME_TEXT } from '../../constants/texts/homeTexts';
import { supabase } from '../lib/supabase';

const CACHE_KEY_PINNED = 'cache_pinned_announcement';
const CACHE_KEY_LIST = 'cache_announcements';

function formatDate(publishedAt) {
  if (!publishedAt) return '';
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';

  try {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return date.toISOString().slice(5, 10);
  }
}

function normalizeAnnouncements(rows = []) {
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: formatDate(row.published_at),
    content: row.message,
    pinned: !!row.pinned,
    image: row.image_url || null,
    images: Array.isArray(row.images) ? row.images : [],
  }));
}

function toPinnedPayload(source) {
  if (!source) return null;

  if (typeof source === 'string') {
    return { title: HOME_TEXT.pinnedTitle, content: source };
  }

  return {
    title: source.title || HOME_TEXT.pinnedTitle,
    content: source.content || HOME_TEXT.fallbackAnnounce,
    id: source.id ?? null,
    date: source.date ?? null,
    image: source.image ?? null,
    images: source.images ?? [],
  };
}

export async function getPinnedAnnouncement() {
  let cached = null;

  try {
    const stored = await AsyncStorage.getItem(CACHE_KEY_PINNED);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        cached = toPinnedPayload(parsed) || null;
      } catch {
        cached = toPinnedPayload(stored);
      }
    }
  } catch (error) {
    console.error('getPinnedAnnouncement cache read error:', error);
  }

  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('pinned', true)
      .order('published_at', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    const [row] = normalizeAnnouncements(data || []);
    const pinned = toPinnedPayload(row) || cached;
    const fallback = {
      title: HOME_TEXT.pinnedTitle,
      content: HOME_TEXT.fallbackAnnounce,
    };
    const result = pinned || fallback;

    try {
      await AsyncStorage.setItem(
        CACHE_KEY_PINNED,
        JSON.stringify(result)
      );
    } catch (cacheError) {
      console.error('getPinnedAnnouncement cache write error:', cacheError);
    }

    return result;
  } catch (error) {
    console.error('getPinnedAnnouncement error:', error);
    if (cached) return cached;
    return {
      title: HOME_TEXT.pinnedTitle,
      content: HOME_TEXT.fallbackAnnounce,
    };
  }
}

export async function getAnnouncements(options = {}) {
  const { forceRefresh = false } = options;

  let announcements = [];
  let error = null;

  try {
    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(CACHE_KEY_LIST);
      if (cached) {
        announcements = JSON.parse(cached);
      }
    }

    const { data, error: supabaseError } = await supabase
      .from('announcements')
      .select('*')
      .order('published_at', { ascending: false });

    if (supabaseError) {
      throw supabaseError;
    }

    const normalized = normalizeAnnouncements(data || []);
    announcements = normalized;

    await AsyncStorage.setItem(
      CACHE_KEY_LIST,
      JSON.stringify(announcements)
    );
  } catch (err) {
    console.error('getAnnouncements error:', err);
    error = err;

    if (!announcements.length) {
      const cached = await AsyncStorage.getItem(CACHE_KEY_LIST);
      if (cached) {
        announcements = JSON.parse(cached);
      }
    }
  }

  return { announcements, error };
}

export default getPinnedAnnouncement;

