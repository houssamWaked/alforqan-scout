import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from '../lib/supabase';

const LAST_SEEN_KEY = 'notifications_last_seen';
const NEWS_TYPE = 'news';
const EVENTS_TYPE = 'events';
const BACKEND_URL = (process.env.EXPO_PUBLIC_BACKEND_URL || '').replace(
  /\/+$/,
  ''
);

let initialized = false;
let notificationsModule = null;
let handlerRegistered = false;
let activeRealtimeListeners = 0;
let realtimeStop = null;

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

function toComparableTimestamp(value) {
  if (typeof value === 'number') return value;
  return toTimestamp(value);
}

function hasRemotePushBackend() {
  return Boolean(BACKEND_URL);
}

function getProjectId() {
  return (
    Constants?.expoConfig?.extra?.eas?.projectId ||
    Constants?.easConfig?.projectId ||
    null
  );
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

  if (hasRemotePushBackend()) {
    await registerPushTokenWithBackend(mod);
  }
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

async function registerPushTokenWithBackend(mod) {
  const granted = await requestPermission();
  if (!granted) return;

  const projectId = getProjectId();
  if (!projectId) {
    console.warn('Expo projectId is missing. Push token registration skipped.');
    return;
  }

  const pushTokenResponse = await mod.getExpoPushTokenAsync({ projectId });
  const pushToken = pushTokenResponse?.data;

  if (!pushToken) return;

  const response = await fetch(`${BACKEND_URL}/api/push/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: pushToken,
      platform: Platform.OS,
      projectId,
      appVersion: Constants?.expoConfig?.version || null,
    }),
  });

  if (!response.ok) {
    throw new Error(`Push token registration failed: ${response.status}`);
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

async function notifyForItem(type, timestamp, buildContent) {
  const ts = toComparableTimestamp(timestamp);
  if (!ts) return;

  const mod = await getNotifications();
  if (!mod) return;

  const lastSeenMap = await readLastSeen();
  const lastSeen = toComparableTimestamp(lastSeenMap[type]);

  if (lastSeen && ts <= lastSeen) return;

  const granted = await requestPermission();
  if (!granted) {
    await updateLastSeen(type, ts);
    return;
  }

  await ensureAndroidChannel(mod);

  await mod.scheduleNotificationAsync({
    content: buildContent(),
    trigger: null,
  });

  await updateLastSeen(type, ts);
}

export async function notifyForNews(items = []) {
  if (hasRemotePushBackend()) return;

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
  if (hasRemotePushBackend()) return;

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

function getAnnouncementTimestamp(row) {
  return row?.published_at || row?.created_at || row?.updated_at || null;
}

function getEventTimestamp(row) {
  return row?.updated_at || row?.created_at || row?.event_date || row?.date || null;
}

export function startRealtimeNotifications() {
  if (hasRemotePushBackend()) {
    return () => {};
  }

  activeRealtimeListeners += 1;

  if (realtimeStop) {
    return () => {
      activeRealtimeListeners = Math.max(0, activeRealtimeListeners - 1);
      if (activeRealtimeListeners === 0 && realtimeStop) {
        realtimeStop();
      }
    };
  }

  const channels = [];

  const announcementsChannel = supabase
    .channel('notifications-announcements')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'announcements',
      },
      (payload) => {
        const row = payload?.new;
        notifyForItem(
          NEWS_TYPE,
          getAnnouncementTimestamp(row),
          () => ({
            title: row?.title || 'New news item',
            body: row?.message
              ? `${String(row.message).slice(0, 80)}...`
              : 'A new news item was added.',
            data: { id: row?.id, type: NEWS_TYPE },
          })
        ).catch(() => {});
      }
    )
    .subscribe();

  channels.push(announcementsChannel);

  const eventsChannel = supabase
    .channel('notifications-events')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'events',
      },
      (payload) => {
        const row = payload?.new;
        notifyForItem(
          EVENTS_TYPE,
          getEventTimestamp(row),
          () => ({
            title: row?.title || row?.name || 'New event',
            body: row?.event_date || row?.date
              ? `A new event was added for ${row.event_date || row.date}`
              : 'A new event was added.',
            data: { id: row?.id, type: EVENTS_TYPE },
          })
        ).catch(() => {});
      }
    )
    .subscribe();

  channels.push(eventsChannel);

  realtimeStop = () => {
    channels.forEach((channel) => {
      supabase.removeChannel(channel).catch(() => {});
    });
    realtimeStop = null;
  };

  return () => {
    activeRealtimeListeners = Math.max(0, activeRealtimeListeners - 1);
    if (activeRealtimeListeners === 0 && realtimeStop) {
      realtimeStop();
    }
  };
}

export default {
  initNotifications,
  startRealtimeNotifications,
  notifyForNews,
  notifyForEvents,
};
