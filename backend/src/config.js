const trim = (value) => (typeof value === 'string' ? value.trim() : '');

export const config = {
  port: Number(process.env.PORT || 3000),
  supabaseUrl: trim(process.env.SUPABASE_URL),
  supabaseServiceRoleKey: trim(process.env.SUPABASE_SERVICE_ROLE_KEY),
  webhookSecret: trim(process.env.WEBHOOK_SECRET),
  expoAccessToken: trim(process.env.EXPO_ACCESS_TOKEN),
};

export function assertConfig() {
  const missing = [];

  if (!config.supabaseUrl) missing.push('SUPABASE_URL');
  if (!config.supabaseServiceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!config.webhookSecret) missing.push('WEBHOOK_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}
