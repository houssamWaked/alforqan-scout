import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cache_news';

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

function normalizeNewsItems(rows = []) {
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: formatDate(row.published_at),
    content: row.message,
    pinned: !!row.pinned,
    image: row.image_url || row.image || null,
    images: Array.isArray(row.images) ? row.images : [],
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

export async function getNews(forceRefresh = false) {
  let news = [];
  let error = null;

  try {
    if (!forceRefresh) {
      news = await readCache();
    }

    if (news.length && !forceRefresh) {
      return { news, error: null };
    }

    const { data, error: supabaseError } = await supabase
      .from('announcements')
      .select('*')
      .order('published_at', { ascending: false });

    if (supabaseError) {
      throw supabaseError;
    }

    news = normalizeNewsItems(data || []);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(news));
  } catch (err) {
    error = err;

    if (!news.length) {
      news = await readCache();
    }
  }

  return { news, error };
}

export async function getNewsById(id, options = {}) {
  if (!id) return { news: null, error: null };

  const { forceRefresh = false } = options;
  const { news, error } = await getNews(forceRefresh);

  const targetId = String(id);
  const item = news.find((row) => String(row.id) === targetId) || null;

  return { news: item, error };
}

export default getNews;
