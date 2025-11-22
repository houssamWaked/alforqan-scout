-- Device tokens table
create table if not exists public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  platform text,
  user_id uuid,
  last_used_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Trigger function for new news
create or replace function public.notify_news_insert()
returns trigger
as $$
declare
  functions_url text := coalesce(current_setting('app.settings.functions_url', true), 'https://<project-ref>.functions.supabase.co');
begin
  perform
    net.http_post(
      url := functions_url || '/send-push',
      body := json_build_object('type', 'news', 'data', json_build_object('title', new.title))::text,
      headers := jsonb_build_object('Content-Type', 'application/json')
    );
  return new;
end;
$$ language plpgsql;

-- Trigger function for new events
create or replace function public.notify_event_insert()
returns trigger
as $$
declare
  functions_url text := coalesce(current_setting('app.settings.functions_url', true), 'https://<project-ref>.functions.supabase.co');
begin
  perform
    net.http_post(
      url := functions_url || '/send-push',
      body := json_build_object('type', 'event', 'data', json_build_object('title', new.title))::text,
      headers := jsonb_build_object('Content-Type', 'application/json')
    );
  return new;
end;
$$ language plpgsql;

-- Triggers
create or replace trigger on_news_created
after insert on public.news
for each row execute procedure public.notify_news_insert();

create or replace trigger on_event_created
after insert on public.events
for each row execute procedure public.notify_event_insert();
