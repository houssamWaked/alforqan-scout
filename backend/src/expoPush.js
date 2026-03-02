import { config } from './config.js';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const EXPO_RECEIPTS_URL = 'https://exp.host/--/api/v2/push/getReceipts';
const PUSH_BATCH_SIZE = 100;
const RECEIPT_BATCH_SIZE = 1000;
const RECEIPT_DELAY_MS = 60_000;

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (config.expoAccessToken) {
    headers.Authorization = `Bearer ${config.expoAccessToken}`;
  }

  return headers;
}

export function isExpoPushToken(token) {
  return /^(ExponentPushToken|ExpoPushToken)\[[^\]]+\]$/.test(token || '');
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Expo push request failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function sendPushNotifications(messages = []) {
  const receiptEntries = [];
  const invalidTokens = [];
  let accepted = 0;

  for (const messageChunk of chunk(messages, PUSH_BATCH_SIZE)) {
    const response = await postJson(EXPO_PUSH_URL, messageChunk);
    const tickets = Array.isArray(response?.data) ? response.data : [];

    tickets.forEach((ticket, index) => {
      const token = messageChunk[index]?.to;
      if (!token) return;

      if (ticket?.status === 'ok') {
        accepted += 1;
        if (ticket.id) {
          receiptEntries.push({ id: ticket.id, token });
        }
        return;
      }

      if (ticket?.details?.error === 'DeviceNotRegistered') {
        invalidTokens.push(token);
      }
    });
  }

  return { accepted, invalidTokens, receiptEntries };
}

export async function getInvalidTokensFromReceipts(receiptEntries = []) {
  const invalidTokens = new Set();

  for (const receiptChunk of chunk(receiptEntries, RECEIPT_BATCH_SIZE)) {
    const ids = receiptChunk.map((entry) => entry.id);
    if (ids.length === 0) continue;

    const response = await postJson(EXPO_RECEIPTS_URL, { ids });
    const receipts = response?.data || {};

    receiptChunk.forEach(({ id, token }) => {
      const receipt = receipts[id];
      if (receipt?.status !== 'error') return;
      if (receipt?.details?.error === 'DeviceNotRegistered') {
        invalidTokens.add(token);
      }
    });
  }

  return [...invalidTokens];
}

export function scheduleReceiptCheck(receiptEntries, onInvalidTokens) {
  if (!Array.isArray(receiptEntries) || receiptEntries.length === 0) return;

  const timer = setTimeout(async () => {
    try {
      const invalidTokens = await getInvalidTokensFromReceipts(receiptEntries);
      if (invalidTokens.length > 0) {
        await onInvalidTokens(invalidTokens);
      }
    } catch (error) {
      console.error('Failed to process Expo receipts:', error);
    }
  }, RECEIPT_DELAY_MS);

  if (typeof timer.unref === 'function') {
    timer.unref();
  }
}
