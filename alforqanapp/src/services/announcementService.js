import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOME_TEXT } from '../../constants/texts/homeTexts';

const CACHE_KEY = 'cache_pinned_announcement';

/**
 * Get the pinned announcement text.
 *
 * Currently this returns a local fallback string and caches it so that the
 * call pattern is already async/offline-ready when you plug in a real API.
 */
export async function getPinnedAnnouncement() {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      return cached;
    }

    // TODO: Replace with remote API call when backend is ready.
    const fallback = HOME_TEXT.fallbackAnnounce;
    await AsyncStorage.setItem(CACHE_KEY, fallback);
    return fallback;
  } catch (error) {
    console.error('getPinnedAnnouncement error:', error);
    // Always fall back to a safe local string so UI never breaks.
    return HOME_TEXT.fallbackAnnounce;
  }
}

export default getPinnedAnnouncement;

