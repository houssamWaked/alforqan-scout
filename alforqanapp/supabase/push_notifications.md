# Push notification setup

1. Enable outbound HTTP in the database (once per project):
```sql
create extension if not exists http with schema extensions;
select extensions.http_set_setting('http.proxy', '');
```

2. Store your Functions base URL so triggers know where to send requests:
```sql
select set_config('app.settings.functions_url', 'https://<project-ref>.functions.supabase.co', true);
```

3. Deploy the edge function (`send-push`) then use its public URL:
```
https://<project-ref>.functions.supabase.co/send-push
```

4. Device tokens table and triggers live in `push_notifications.sql`.

5. The trigger functions call the edge function with payloads shaped as `{ type, data }`.
