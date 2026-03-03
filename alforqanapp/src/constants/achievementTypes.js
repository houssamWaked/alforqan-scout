export const ACHIEVEMENT_FILTER_TYPE = 'all';

export const ACHIEVEMENT_TYPES = ['competition', 'camp', 'service'];

const ACHIEVEMENT_TYPE_LABELS = {
  competition: 'مسابقة',
  camp: 'معسكر',
  service: 'خدمة',
};

function isAsciiSlug(value) {
  return /^[a-z0-9 _-]+$/i.test(value);
}

function humanizeAsciiSlug(value) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeAchievementType(value) {
  const normalized = String(value || '').trim();
  if (!normalized) {
    return ACHIEVEMENT_TYPES[0];
  }

  return isAsciiSlug(normalized) ? normalized.toLowerCase() : normalized;
}

export function getAchievementTypeLabel(type) {
  const normalized = normalizeAchievementType(type);
  return (
    ACHIEVEMENT_TYPE_LABELS[normalized] ||
    humanizeAsciiSlug(normalized) ||
    'إنجاز'
  );
}

export function getAchievementTypeIcon(type) {
  const normalized = normalizeAchievementType(type);

  switch (normalized) {
    case ACHIEVEMENT_FILTER_TYPE:
      return 'sparkles-outline';
    case 'competition':
      return 'trophy-outline';
    case 'camp':
      return 'bonfire-outline';
    case 'service':
      return 'hand-left-outline';
    default:
      return 'medal-outline';
  }
}
