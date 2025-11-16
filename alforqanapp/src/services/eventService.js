export const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Camping Trip',
    date: 'Dec 14',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80',
  },
  {
    id: 2,
    title: 'Archery Challenge',
    date: 'Dec 20',
    image:
      'https://images.unsplash.com/photo-1520975918318-3ca8a6d6b53f?q=80',
  },
];

export function getLatestEvents() {
  // TODO: Replace with real API / Supabase fetch
  return MOCK_EVENTS;
}

