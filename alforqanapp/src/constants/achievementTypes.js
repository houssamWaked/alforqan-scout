export const ACHIEVEMENT_FILTER_TYPE = 'all';

export const ACHIEVEMENT_TYPES = ['competition', 'camp', 'service'];

export function normalizeAchievementType(value) {
  const normalized = String(value || '')
    .trim()
    .toLowerCase();

  if (ACHIEVEMENT_TYPES.includes(normalized)) {
    return normalized;
  }

  return ACHIEVEMENT_TYPES[0];
}
