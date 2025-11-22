import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cache_about';
const TABLE_NAME =
  process.env.EXPO_PUBLIC_SUPABASE_ABOUT_TABLE || 'about';

function normalizeHero(hero) {
  if (!hero) return null;

  if (typeof hero === 'string') {
    return { image: null, text: hero };
  }

  const image =
    hero.image ||
    hero.image_url ||
    hero.hero_image ||
    hero.heroImage ||
    null;

  const text =
    hero.text ||
    hero.hero_text ||
    hero.heroText ||
    '';

  if (!image && !text) return null;

  return { image, text };
}

function normalizeAbout(data) {
  if (!data) return null;

  const sections = Array.isArray(data.sections)
    ? data.sections.map((section, index) => ({
        title: section?.title || '',
        description: section?.description || '',
        order:
          typeof section?.order === 'number'
            ? section.order
            : index,
      }))
    : [];

  const timeline = Array.isArray(data.timeline)
    ? data.timeline.map((entry, index) => ({
        year: entry?.year || '',
        title: entry?.title || '',
        description: entry?.description || '',
        order:
          typeof entry?.order === 'number'
            ? entry.order
            : index,
      }))
    : [];

  const units = Array.isArray(data.units)
    ? data.units.map((unit, index) => ({
        title: unit?.title || '',
        description: unit?.description || '',
        age: unit?.age || unit?.age_range || '',
        icon: unit?.icon || unit?.emoji || '',
        divisionId:
          unit?.divisionId ||
          unit?.division_id ||
          unit?.division ||
          null,
        order:
          typeof unit?.order === 'number'
            ? unit.order
            : index,
      }))
    : [];

  const hero = normalizeHero(
    data.hero || {
      image: data.hero_image || data.heroImage,
      text: data.hero_text || data.heroText,
    }
  );

  const normalized = {
    title: data.title || '',
    sections,
    timeline,
    timelineLabel:
      data.timelineLabel ||
      data.timeline_label ||
      '',
    units,
    unitsLabel:
      data.unitsLabel || data.units_label || '',
    hero,
    unitButtonLabel:
      data.unitButtonLabel ||
      data.unit_button_label ||
      data.cta_label ||
      '',
  };

  const hasContent =
    normalized.title ||
    sections.length > 0 ||
    timeline.length > 0 ||
    units.length > 0 ||
    (normalized.hero &&
      (normalized.hero.text || normalized.hero.image));

  return hasContent ? normalized : null;
}

async function readCache() {
  const cached = await AsyncStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

async function fetchRemoteAbout() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAbout(forceRefresh = false) {
  let about = null;
  let error = null;

  try {
    if (!forceRefresh) {
      about = await readCache();
    }

    if (about && !forceRefresh) {
      return { about: normalizeAbout(about), error: null };
    }

    const remote = await fetchRemoteAbout();
    about = normalizeAbout(remote);

    if (about) {
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify(about)
      );
    } else {
      await AsyncStorage.removeItem(CACHE_KEY);
    }
  } catch (err) {
    error = err;

    if (!about) {
      about = normalizeAbout(await readCache());
    }
  }

  return { about, error };
}

export default getAbout;
