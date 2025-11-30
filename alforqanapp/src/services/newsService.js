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

function parseImages(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      // fall through to comma-split below
    }

    return trimmed
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeImages(row) {
  const candidates = [
    row.images,
    row.images_url,
    row.image_urls,
    row.imagesUrl,
    row.imageUrls,
  ];

  for (const candidate of candidates) {
    const parsed = parseImages(candidate);
    if (parsed.length) return parsed;
  }

  return [];
}

function normalizeNewsItems(rows = []) {
  return rows.map((row) => {
    const images = normalizeImages(row);
    const createdAt = row.created_at || null;
    const updatedAt = row.updated_at || null;
    const publishedAt = row.published_at || createdAt || updatedAt || null;

    return {
      id: row.id,
      title: row.title,
      date: formatDate(row.published_at),
      content: row.message,
      pinned: !!row.pinned,
      publishedAtRaw: publishedAt,
      createdAt,
      updatedAt,
      image: row.image_url || row.image || images[0] || null,
      images,
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

export async function getNews(forceRefresh = false) {
  let news = [];
  let error = null;

  try {
    // 1) Try cache for fast render
    if (!forceRefresh) {
      const cached = await readCache();
      if (cached?.length) {
        news = cached;
      }
    }

    // 2) Always hit Supabase to keep data fresh (unless explicitly forced off)
    const { data, error: supabaseError } = await supabase
      .from('announcements')
      .select('*')
      .order('published_at', { ascending: false });

    if (supabaseError) {
      throw supabaseError;
    }

    const normalized = normalizeNewsItems(data || []);
    news = normalized;

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
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
  let item = news.find((row) => String(row.id) === targetId) || null;
  let detailError = error;

  const shouldFetchLatest =
    forceRefresh || !item || !item.images || item.images.length === 0;

  if (shouldFetchLatest) {
    try {
      const { data, error: supabaseError } = await supabase
        .from('announcements')
        .select('*')
        .eq('id', targetId)
        .single();

      if (data) {
        const [normalized] = normalizeNewsItems([data]);
        item = normalized || item;

        const updatedList = [...news];
        const idx = updatedList.findIndex(
          (row) => String(row.id) === targetId
        );
        if (idx >= 0) {
          updatedList[idx] = item;
          await AsyncStorage.setItem(
            CACHE_KEY,
            JSON.stringify(updatedList)
          );
        }
      } else if (supabaseError) {
        detailError = detailError || supabaseError;
      }
    } catch (err) {
      detailError = detailError || err;
    }
  }

  return { news: item, error: detailError };
}

export default getNews;
