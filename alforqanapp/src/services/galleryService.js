import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cache_gallery';

function normalizeGalleryItems(rows = []) {
  return rows.map((item) => ({
    ...item,
    image: item.image || item.image_url || item.imageUrl || null,
  }));
}

export async function getGallery(forceRefresh = false) {
  let images = [];
  let error = null;

  try {
    // 🔹 1. Load from cache if not force-refresh
    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          images = JSON.parse(cached);
        } catch {
          images = [];
        }
      }
    }

    // 🔹 2. If we have cached images AND not force-refresh → return them immediately
    if (images.length && !forceRefresh) {
      return { images, error: null };
    }

    // 🔹 3. Fetch from Supabase
    const { data, error: supabaseError } = await supabase
      .from('gallery_items')
      .select('*')
      .order('year', { ascending: false });

    if (supabaseError) throw supabaseError;

    // 🔹 4. Normalize and update cache
    const normalized = normalizeGalleryItems(data || []);
    images = normalized;

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(images));
  } catch (err) {
    console.error('Gallery fetch error:', err?.message || err);

    error = err;

    // 🔹 5. Fallback to cache if available
    if (!images.length) {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          images = JSON.parse(cached);
        } catch {
          images = [];
        }
      }
    }
  }

  return { images, error };
}

export default getGallery;
