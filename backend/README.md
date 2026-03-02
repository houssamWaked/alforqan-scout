# Railway Backend

This service handles Expo push notification delivery for the mobile app.

## What it does

- Registers Expo push tokens from the app
- Receives Supabase database webhooks for new `announcements` and `events`
- Sends push notifications through Expo Push
- Deactivates invalid tokens when Expo marks them as unregistered

## Endpoints

- `GET /health`
- `POST /api/push/register`
- `POST /api/webhooks/supabase`
- `POST /api/notifications/test`

## Environment variables

Copy `.env.example` to `.env` and set:

- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WEBHOOK_SECRET`
- `EXPO_ACCESS_TOKEN`

`EXPO_ACCESS_TOKEN` is optional unless you enabled Expo push access token protection.

## Railway deploy

1. Create a new Railway service from this repo.
2. Set the service root directory to `backend`.
3. Add the environment variables from `.env.example`.
4. Deploy.

Railway can use the included `Dockerfile`, or you can let it run the `npm start` script.

## Supabase setup

1. Run [supabase-push-tokens.sql](/c:/Users/waked/Desktop/s/alforqan-scout/backend/supabase-push-tokens.sql).
2. Edit [supabase-webhooks-template.sql](/c:/Users/waked/Desktop/s/alforqan-scout/backend/supabase-webhooks-template.sql) with your Railway URL and webhook secret.
3. Run the edited webhook SQL in Supabase.

## Mobile app setup

Set `EXPO_PUBLIC_BACKEND_URL` in the Expo app environment to your Railway backend URL, for example:

`EXPO_PUBLIC_BACKEND_URL=https://your-railway-service.up.railway.app`

After that, the app will register device tokens with the backend and the backend will handle remote push delivery.
