import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const LAST_SEEN_KEY = 'notifications_last_seen';
const NEWS_TYPE = 'news';
const EVENTS_TYPE = 'events';

let initialized = false;
let notificationsModule = null;
let handlerRegistered = false;

function isExpoGo() {
  return (
    Constants?.appOwnership === 'expo' ||
    Constants?.executionEnvironment === 'storeClient'
  );
}

async function getNotifications() {
  if (isExpoGo()) return null;

  if (notificationsModule) return notificationsModule;

  const mod = await import('expo-notifications');
  notificationsModule = mod;

  if (!handlerRegistered) {
    mod.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    handlerRegistered = true;
  }

  return mod;
}

async function ensureAndroidChannel(mod) {
  if (!mod || Platform.OS !== 'android') return;
  await mod.setNotificationChannelAsync('default', {
    name: 'General',
    importance: mod.AndroidImportance.DEFAULT,
  });
}

export async function initNotifications() {
  if (initialized) return;
  initialized = true;

  const mod = await getNotifications();
  if (!mod) return;

  await ensureAndroidChannel(mod);
}

async function requestPermission() {
  const mod = await getNotifications();
  if (!mod) return false;

  try {
    const current = await mod.getPermissionsAsync();
    if (current?.granted || current?.status === 'granted') return true;

    const asked = await mod.requestPermissionsAsync();
    return asked?.granted || asked?.status === 'granted';
  } catch {
    return false;
  }
}

async function readLastSeen() {
  try {
    const stored = await AsyncStorage.getItem(LAST_SEEN_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function writeLastSeen(map) {
  try {
    await AsyncStorage.setItem(LAST_SEEN_KEY, JSON.stringify(map));
  } catch {
    // ignore cache errors
  }
}

async function updateLastSeen(type, timestamp) {
  if (!timestamp) return;
  const map = await readLastSeen();
  map[type] = timestamp;
  await writeLastSeen(map);
}

function toTimestamp(value) {
  if (!value) return null;
  const ts = new Date(value).getTime();
  return Number.isFinite(ts) ? ts : null;
}

function getLatest(items, pickDate) {
  if (!Array.isArray(items) || items.length === 0) return { latest: null, ts: null };
  return items.reduce(
    (acc, current) => {
      const candidateTs = toTimestamp(pickDate(current));
      if (candidateTs && (!acc.ts || candidateTs > acc.ts)) {
        return { latest: current, ts: candidateTs };
      }
      return acc;
    },
    { latest: null, ts: null }
  );
}

async function notifyIfNew(type, items, pickDate, buildContent) {
  const { latest, ts } = getLatest(items, pickDate);
  if (!latest || !ts) return;

  const mod = await getNotifications();
  if (!mod) return;

  const lastSeenMap = await readLastSeen();
  const lastSeen = lastSeenMap[type] || null;

  // First load: record timestamp but don't notify to avoid spamming
  if (!lastSeen) {
    await updateLastSeen(type, ts);
    return;
  }

  if (ts <= lastSeen) return;

  const granted = await requestPermission();
  if (!granted) {
    await updateLastSeen(type, ts);
    return;
  }

  await ensureAndroidChannel(mod);

  const content = buildContent(latest);
  await mod.scheduleNotificationAsync({
    content,
    trigger: null,
  });

  await updateLastSeen(type, ts);
}

export async function notifyForNews(items = []) {
  await notifyIfNew(
    NEWS_TYPE,
    items,
    (item) => item.publishedAtRaw || item.createdAt || item.updatedAt,
    (item) => ({
      title: item.title || 'New announcement',
      body: item.content ? `${item.content.slice(0, 80)}...` : 'A new announcement was published.',
      data: { id: item.id, type: NEWS_TYPE },
    })
  );
}

export async function notifyForEvents(items = []) {
  await notifyIfNew(
    EVENTS_TYPE,
    items,
    (item) =>
      item.updatedAt ||
      item.createdAt ||
      item.eventDateRaw ||
      item.date,
    (item) => ({
      title: item.title || 'New event added',
      body: item.eventDateRaw
        ? `${item.title || 'Event'} scheduled for ${item.eventDateRaw}`
        : 'A new event is available.',
      data: { id: item.id, type: EVENTS_TYPE },
    })
  );
}

export default {
  initNotifications,
  notifyForNews,
  notifyForEvents,
};
