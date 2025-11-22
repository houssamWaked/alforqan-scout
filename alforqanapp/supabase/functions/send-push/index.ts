import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.0';

type Payload = {
  type: 'news' | 'event';
  data: { title: string; body?: string };
};

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { type, data }: Payload = await req.json();
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: tokens } = await supabase.from('device_tokens').select('token');
  const messages = (tokens || []).map((row) => ({
    to: row.token,
    sound: 'default',
    title: type === 'news' ? 'خبر جديد' : 'فعالية جديدة',
    body: data?.title || 'اطلع على التفاصيل الآن',
  }));

  if (!messages.length) {
    return new Response(JSON.stringify({ success: true, sent: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expoResponse = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messages),
  });

  const result = await expoResponse.json();

  return new Response(JSON.stringify({ success: true, result }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
