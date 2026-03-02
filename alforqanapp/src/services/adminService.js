import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const TABLE_CACHE_KEYS = {
  announcements: [
    'cache_pinned_announcement',
    'cache_announcements',
    'cache_news',
  ],
  events: ['cache_events'],
  achievements: ['cache_achievements'],
  gallery_items: ['cache_gallery'],
};

async function clearTableCache(table) {
  const keys = TABLE_CACHE_KEYS[table] || [];

  if (!keys.length) {
    return;
  }

  await AsyncStorage.multiRemove(keys);
}

export async function listAdminRows({
  table,
  orderBy = 'id',
  ascending = false,
}) {
  if (!table) {
    return { rows: [], error: new Error('Table name is required') };
  }

  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending });

    if (error) {
      throw error;
    }

    return { rows: data || [], error: null };
  } catch (err) {
    return { rows: [], error: err };
  }
}

export async function saveAdminRow({ table, id, values }) {
  if (!table) {
    return { row: null, error: new Error('Table name is required') };
  }

  try {
    const query = id
      ? supabase.from(table).update(values).eq('id', id)
      : supabase.from(table).insert([values]);

    const { data, error } = await query.select().maybeSingle();

    if (error) {
      throw error;
    }

    await clearTableCache(table);

    return { row: data || null, error: null };
  } catch (err) {
    return { row: null, error: err };
  }
}

export async function deleteAdminRow({ table, id }) {
  if (!table) {
    return { error: new Error('Table name is required') };
  }

  if (!id && id !== 0) {
    return { error: new Error('Row id is required') };
  }

  try {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) {
      throw error;
    }

    await clearTableCache(table);

    return { error: null };
  } catch (err) {
    return { error: err };
  }
}

export default {
  listAdminRows,
  saveAdminRow,
  deleteAdminRow,
};
