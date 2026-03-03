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

async function clearCacheKeys(keys) {
  const uniqueKeys = [...new Set((keys || []).filter(Boolean))];

  if (!uniqueKeys.length) {
    return;
  }

  await AsyncStorage.multiRemove(uniqueKeys);
}

async function clearTableCache(table) {
  const keys = TABLE_CACHE_KEYS[table] || [];
  await clearCacheKeys(keys);
}

function isMissingRelationError(error) {
  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('does not exist') ||
    message.includes('not exist') ||
    error?.code === 'PGRST205' ||
    error?.code === '42P01'
  );
}

function isMissingColumnError(error) {
  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('schema cache') ||
    message.includes('could not find the') ||
    message.includes('column') ||
    error?.code === 'PGRST204' ||
    error?.code === '42703'
  );
}

async function detachGalleryItemsFromEvent(eventId) {
  const { error } = await supabase
    .from('gallery_items')
    .update({ event_id: null })
    .eq('event_id', eventId);

  if (error) {
    throw error;
  }
}

async function deleteEventRegistrations(eventId) {
  try {
    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (isMissingRelationError(error)) {
      return;
    }

    throw error;
  }
}

async function deleteEventRow(eventId) {
  await detachGalleryItemsFromEvent(eventId);
  await deleteEventRegistrations(eventId);

  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    throw error;
  }

  await clearCacheKeys([
    ...TABLE_CACHE_KEYS.events,
    ...TABLE_CACHE_KEYS.gallery_items,
  ]);
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
    let query = supabase.from(table).select('*');

    if (orderBy) {
      query = query.order(orderBy, { ascending });
    }

    let { data, error } = await query;

    if (error && orderBy && isMissingColumnError(error)) {
      ({ data, error } = await supabase.from(table).select('*'));
    }

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
    const buildQuery = (payload) =>
      id
        ? supabase.from(table).update(payload).eq('id', id)
        : supabase.from(table).insert([payload]);

    let payload = values;
    let query = buildQuery(payload);

    let { data, error } = await query.select().maybeSingle();

    const errorMessage = String(error?.message || '').toLowerCase();

    const missingEquipmentColumn =
      table === 'events' &&
      payload &&
      Object.prototype.hasOwnProperty.call(payload, 'equipment') &&
      errorMessage.includes('equipment');

    if (missingEquipmentColumn) {
      const { equipment, ...rest } = payload;
      payload = {
        ...rest,
        equibment: equipment,
      };
      query = buildQuery(payload);
      ({ data, error } = await query.select().maybeSingle());
    }

    const missingAchievementImagesColumn =
      table === 'achievements' &&
      payload &&
      Object.prototype.hasOwnProperty.call(payload, 'images') &&
      String(error?.message || '').toLowerCase().includes('images');

    if (missingAchievementImagesColumn) {
      const { images, ...rest } = payload;
      const fallbackPayloads = [
        { ...rest, image_urls: images },
        { ...rest, images_url: images },
        rest,
      ];

      for (const candidate of fallbackPayloads) {
        query = buildQuery(candidate);
        ({ data, error } = await query.select().maybeSingle());
        if (!error) {
          payload = candidate;
          break;
        }
      }
    }

    const missingGalleryCaptionColumn =
      table === 'gallery_items' &&
      payload &&
      Object.prototype.hasOwnProperty.call(payload, 'caption') &&
      String(error?.message || '').toLowerCase().includes('caption');

    if (missingGalleryCaptionColumn) {
      const { caption, ...rest } = payload;
      const fallbackPayloads = [
        { ...rest, title: caption },
        { ...rest, description: caption },
        rest,
      ];

      for (const candidate of fallbackPayloads) {
        query = buildQuery(candidate);
        ({ data, error } = await query.select().maybeSingle());
        if (!error) {
          payload = candidate;
          break;
        }
      }
    }

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
    if (table === 'events') {
      await deleteEventRow(id);
      return { error: null };
    }

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
