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

export async function getPinnedAnnouncement() {
  let cached = null;

  try {
    cached = await AsyncStorage.getItem(CACHE_KEY_PINNED);
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

    const row = data && data.length > 0 ? data[0] : null;
    const text = row?.message || cached || HOME_TEXT.fallbackAnnounce;

    try {
      await AsyncStorage.setItem(CACHE_KEY_PINNED, text);
    } catch (cacheError) {
      console.error('getPinnedAnnouncement cache write error:', cacheError);
    }

    return text;
  } catch (error) {
    console.error('getPinnedAnnouncement error:', error);
    if (cached) return cached;
    return HOME_TEXT.fallbackAnnounce;
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

