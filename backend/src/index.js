import express from 'express';
import { assertConfig, config } from './config.js';
import { sendPushNotifications, isExpoPushToken, scheduleReceiptCheck } from './expoPush.js';
import { supabaseAdmin } from './supabase.js';

assertConfig();

const app = express();

app.use(express.json({ limit: '1mb' }));

function nowIso() {
  return new Date().toISOString();
}

function isAuthorizedRequest(req) {
  const headerSecret = req.get('x-webhook-secret') || '';
  const authHeader = req.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';

  return headerSecret === config.webhookSecret || bearer === config.webhookSecret;
}

async function deactivateTokens(tokens = []) {
  if (!Array.isArray(tokens) || tokens.length === 0) return;

  const uniqueTokens = [...new Set(tokens.filter(Boolean))];
  if (uniqueTokens.length === 0) return;

  const { error } = await supabaseAdmin
    .from('push_tokens')
    .update({
      is_active: false,
      updated_at: nowIso(),
    })
    .in('token', uniqueTokens);

  if (error) {
    throw error;
  }
}

async function getActiveTokens() {
  const { data, error } = await supabaseAdmin
    .from('push_tokens')
    .select('token')
    .eq('is_active', true);

  if (error) {
    throw error;
  }

  return (data || [])
    .map((row) => row.token)
    .filter(isExpoPushToken);
}

function buildWebhookNotification(payload) {
  const table = payload?.table;
  const type = payload?.type;
  const record = payload?.record;

  if (type !== 'INSERT' || !record) {
    return null;
  }

  if (table === 'announcements') {
    return {
      title: record.title || 'New news item',
      body: record.message
        ? `${String(record.message).slice(0, 120)}${String(record.message).length > 120 ? '...' : ''}`
        : 'A new news item was added.',
      data: {
        id: record.id,
        type: 'news',
      },
    };
  }

  if (table === 'events') {
    const title = record.title || record.name || 'New event';
    const date = record.event_date || record.date || '';
    return {
      title,
      body: date ? `A new event was added for ${date}` : 'A new event was added.',
      data: {
        id: record.id,
        type: 'events',
      },
    };
  }

  return null;
}

async function deliverNotification(notification) {
  const tokens = await getActiveTokens();
  if (tokens.length === 0) {
    return {
      accepted: 0,
      totalTokens: 0,
    };
  }

  const messages = tokens.map((token) => ({
    to: token,
    title: notification.title,
    body: notification.body,
    data: notification.data,
    sound: 'default',
    channelId: 'default',
  }));

  const { accepted, invalidTokens, receiptEntries } = await sendPushNotifications(messages);

  if (invalidTokens.length > 0) {
    await deactivateTokens(invalidTokens);
  }

  scheduleReceiptCheck(receiptEntries, deactivateTokens);

  return {
    accepted,
    totalTokens: tokens.length,
  };
}

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'alforqan-backend',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
  });
});

app.post('/api/push/register', async (req, res) => {
  try {
    const token = String(req.body?.token || '').trim();
    const platform = String(req.body?.platform || '').trim() || null;
    const appVersion = String(req.body?.appVersion || '').trim() || null;
    const projectId = String(req.body?.projectId || '').trim() || null;

    if (!isExpoPushToken(token)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid Expo push token.',
      });
    }

    const timestamp = nowIso();
    const { error } = await supabaseAdmin
      .from('push_tokens')
      .upsert(
        {
          token,
          platform,
          app_version: appVersion,
          project_id: projectId,
          is_active: true,
          last_seen_at: timestamp,
          updated_at: timestamp,
        },
        {
          onConflict: 'token',
        }
      );

    if (error) {
      throw error;
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Failed to register push token:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to register push token.',
    });
  }
});

app.post('/api/webhooks/supabase', async (req, res) => {
  if (!isAuthorizedRequest(req)) {
    return res.status(401).json({
      ok: false,
      error: 'Unauthorized.',
    });
  }

  try {
    const notification = buildWebhookNotification(req.body);
    if (!notification) {
      return res.status(202).json({
        ok: true,
        ignored: true,
      });
    }

    const result = await deliverNotification(notification);
    return res.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error('Failed to process Supabase webhook:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to process webhook.',
    });
  }
});

app.post('/api/notifications/test', async (req, res) => {
  if (!isAuthorizedRequest(req)) {
    return res.status(401).json({
      ok: false,
      error: 'Unauthorized.',
    });
  }

  try {
    const title = String(req.body?.title || '').trim() || 'Test notification';
    const body = String(req.body?.body || '').trim() || 'Railway backend is working.';
    const data =
      req.body?.data && typeof req.body.data === 'object' ? req.body.data : {};

    const result = await deliverNotification({ title, body, data });
    return res.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error('Failed to send test notification:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send test notification.',
    });
  }
});

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`);
});
