import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { normalizeAchievementType } from '../constants/achievementTypes';

const CACHE_KEY = 'cache_achievements';

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

function normalizeAchievements(rows = []) {
  return rows.map((item) => {
    const imageCandidates = [
      parseImages(item.images),
      parseImages(item.images_url),
      parseImages(item.image_urls),
    ];

    const images =
      imageCandidates.find((list) => Array.isArray(list) && list.length) || [];

    return {
      ...item,
      title: item.title || item.name || '',
      description: item.description || item.details || '',
      badge: item.badge || item.badge_name || '',
      year: item.year || item.date || '',
      image: item.image || item.image_url || item.imageUrl || null,
      images,
      type: normalizeAchievementType(item.type || item.category),
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

export async function getAchievements(options = {}) {
  const {
    forceRefresh = false,
    limit,
    orderBy = 'year',
    ascending = false,
  } = options;

  let achievements = [];
  let error = null;

  try {
    if (!forceRefresh) {
      achievements = await readCache();
    }

    if (achievements.length && !forceRefresh) {
      return { achievements, error: null };
    }

    let query = supabase.from('achievements').select('*');

    if (orderBy) {
      query = query.order(orderBy, { ascending });
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error: supabaseError } = await query;

    if (supabaseError) {
      throw supabaseError;
    }

    achievements = normalizeAchievements(data || []);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(achievements));
  } catch (err) {
    error = err;

    if (!achievements.length) {
      achievements = await readCache();
    }
  }

  return { achievements, error };
}

export async function getAchievementById(id, options = {}) {
  if (!id) return { achievement: null, error: null };

  const { forceRefresh = false } = options;
  const { achievements, error } = await getAchievements({ forceRefresh });

  const targetId = String(id);
  const achievement =
    achievements.find((item) => String(item.id) === targetId) || null;

  return { achievement, error };
}

export default getAchievements;
